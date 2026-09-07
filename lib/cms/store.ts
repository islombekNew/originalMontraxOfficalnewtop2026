import fs from "fs/promises";
import path from "path";
import {
  CMS_TABLE,
  MEDIA_BUCKET,
  publicMediaUrl,
  supabaseRead,
  supabaseWrite,
  supabaseReadEnabled,
  supabaseWriteEnabled,
} from "./supabase";
import type { MediaFile } from "./types";

/** CMS saqlash qatlami — ikkita drayver:
 *  1) supabase — SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY bo'lsa (production)
 *  2) fs       — bo'lmasa: content/cms/*.json ga yozadi (faqat lokal dev)
 *  Yozuv topilmasa null qaytadi — chaqiruvchi defaults'ga tushadi. */

export type DriverName = "supabase" | "fs";

export function driverName(): DriverName {
  return supabaseWriteEnabled() ? "supabase" : "fs";
}

/** O'qish va yozish HAR DOIM bitta manbadan bo'ladi.
 *  Aks holda: Supabase'dan o'qib, faylga yozib qo'yish mumkin edi —
 *  saqlangan o'zgarish saytda umuman ko'rinmasdi. */
function useSupabase() {
  return driverName() === "supabase";
}

export function canWrite(): { ok: boolean; reason?: string } {
  if (supabaseWriteEnabled()) return { ok: true };
  if (process.env.NODE_ENV === "production") {
    return {
      ok: false,
      reason:
        "Supabase sozlanmagan. Vercel'da fayl tizimiga yozib bo'lmaydi — SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY ni qo'shing.",
    };
  }
  return { ok: true };
}

/** Admin bosh sahifasi uchun ulanish holati */
export async function cmsStatus() {
  const status = {
    driver: driverName(),
    urlSet: Boolean(process.env.SUPABASE_URL?.trim()),
    anonSet: Boolean(process.env.SUPABASE_ANON_KEY?.trim()),
    serviceSet: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
    reachable: false,
    tableReady: false,
    bucketReady: false,
    message: "",
  };

  if (!supabaseReadEnabled()) {
    status.message = "Supabase sozlanmagan — lokal fayllar ishlatilmoqda.";
    return status;
  }

  const sb = supabaseRead()!;
  try {
    const { error } = await sb.from(CMS_TABLE).select("key").limit(1);
    status.reachable = true;
    if (error) {
      status.reachable = !/fetch failed|ENOTFOUND|ECONNREFUSED/i.test(
        error.message
      );
      status.message = !status.reachable
        ? "SUPABASE_URL manzili javob bermayapti — loyiha o'chirilgan yoki manzil noto'g'ri. Yangi Supabase loyihasi ochib, kalitlarni yangilang."
        : error.code === "42P01"
        ? "Ulanish bor, lekin cms_docs jadvali topilmadi — supabase/schema.sql ni ishga tushiring."
        : `Jadvalni o'qishda xato: ${error.message}`;
    } else {
      status.tableReady = true;
    }
  } catch (e) {
    status.message =
      e instanceof Error
        ? `Supabase'ga ulanib bo'lmadi: ${e.message}`
        : "Supabase'ga ulanib bo'lmadi";
    return status;
  }

  try {
    const { error } = await sb.storage.from(MEDIA_BUCKET).list("", { limit: 1 });
    status.bucketReady = !error;
    if (error && status.tableReady) {
      status.message = `«media» bucket topilmadi: ${error.message}`;
    }
  } catch {
    /* bucket yo'q — yuqoridagi xabar yetarli */
  }

  return status;
}

const FS_DIR = path.join(process.cwd(), "content", "cms");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function fsFile(key: string) {
  return path.join(FS_DIR, `${key.replace(/[^a-z0-9_-]/gi, "_")}.json`);
}

// ─── Doc o'qish / yozish ────────────────────────────────────────────────────

export async function readDoc<T>(key: string): Promise<T | null> {
  if (useSupabase()) {
    const sb = supabaseRead();
    if (!sb) return null;
    const { data, error } = await sb
      .from(CMS_TABLE)
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error) {
      console.warn(`[cms] "${key}" o'qishda xato:`, error.message);
      return null;
    }
    return (data?.value as T) ?? null;
  }

  try {
    const raw = await fs.readFile(fsFile(key), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function readDocs<T>(keys: string[]): Promise<Record<string, T | null>> {
  const out: Record<string, T | null> = {};
  if (useSupabase()) {
    const sb = supabaseRead();
    if (sb) {
      const { data, error } = await sb
        .from(CMS_TABLE)
        .select("key,value")
        .in("key", keys);
      if (!error && data) {
        for (const row of data) out[row.key as string] = row.value as T;
      }
    }
    for (const k of keys) if (!(k in out)) out[k] = null;
    return out;
  }
  await Promise.all(
    keys.map(async (k) => {
      out[k] = await readDoc<T>(k);
    })
  );
  return out;
}

export async function writeDoc(key: string, value: unknown): Promise<void> {
  const gate = canWrite();
  if (!gate.ok) throw new Error(gate.reason);

  if (supabaseWriteEnabled()) {
    const sb = supabaseWrite()!;
    const { error } = await sb
      .from(CMS_TABLE)
      .upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );
    if (error) throw new Error(`Supabase yozishda xato: ${error.message}`);
    return;
  }

  await fs.mkdir(FS_DIR, { recursive: true });
  await fs.writeFile(fsFile(key), JSON.stringify(value, null, 2) + "\n", "utf-8");
}

// ─── Media ──────────────────────────────────────────────────────────────────

const SAFE = /[^a-z0-9._-]/gi;

export function safeFileName(name: string) {
  const ext = path.extname(name).toLowerCase().replace(SAFE, "") || ".bin";
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(SAFE, "-")
    .replace(/-+/g, "-")
    .slice(0, 60) || "file";
  return `${base}-${Date.now().toString(36)}${ext}`;
}

export async function uploadMedia(
  fileName: string,
  bytes: Buffer,
  contentType: string,
  folder = "uploads"
): Promise<{ url: string; name: string }> {
  const gate = canWrite();
  if (!gate.ok) throw new Error(gate.reason);

  const name = safeFileName(fileName);
  const key = `${folder}/${name}`;

  if (supabaseWriteEnabled()) {
    const sb = supabaseWrite()!;
    const { error } = await sb.storage
      .from(MEDIA_BUCKET)
      .upload(key, bytes, { contentType, upsert: true, cacheControl: "31536000" });
    if (error) throw new Error(`Rasm yuklashda xato: ${error.message}`);
    return { url: publicMediaUrl(key), name: key };
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
  return { url: `/uploads/${name}`, name };
}

export async function listMedia(folder = "uploads"): Promise<MediaFile[]> {
  if (useSupabase()) {
    const sb = supabaseRead();
    if (!sb) return [];
    const { data, error } = await sb.storage
      .from(MEDIA_BUCKET)
      .list(folder, { limit: 500, sortBy: { column: "created_at", order: "desc" } });
    if (error || !data) return [];
    return data
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => ({
        name: `${folder}/${f.name}`,
        url: publicMediaUrl(`${folder}/${f.name}`),
        size: (f.metadata?.size as number) ?? 0,
        updatedAt: f.updated_at ?? f.created_at ?? "",
      }));
  }

  try {
    const names = await fs.readdir(UPLOAD_DIR);
    const files = await Promise.all(
      names
        .filter((n) => !n.startsWith("."))
        .map(async (n) => {
          const st = await fs.stat(path.join(UPLOAD_DIR, n));
          return {
            name: n,
            url: `/uploads/${n}`,
            size: st.size,
            updatedAt: st.mtime.toISOString(),
          };
        })
    );
    return files.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch {
    return [];
  }
}

export async function deleteMedia(name: string): Promise<void> {
  const gate = canWrite();
  if (!gate.ok) throw new Error(gate.reason);

  if (supabaseWriteEnabled()) {
    const sb = supabaseWrite()!;
    const { error } = await sb.storage.from(MEDIA_BUCKET).remove([name]);
    if (error) throw new Error(`O'chirishda xato: ${error.message}`);
    return;
  }
  const base = path.basename(name);
  await fs.unlink(path.join(UPLOAD_DIR, base)).catch(() => {});
}

/** public/media ichidagi mavjud rasmlar — media kutubxonasida ko'rsatish uchun */
export async function listBundledMedia(): Promise<MediaFile[]> {
  const root = path.join(process.cwd(), "public", "media");
  const out: MediaFile[] = [];
  async function walk(dir: string, rel: string) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name.startsWith(".") || e.name === "desktop.ini") continue;
      const abs = path.join(dir, e.name);
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) {
        await walk(abs, r);
      } else {
        const st = await fs.stat(abs);
        out.push({
          name: `media/${r}`,
          url: `/media/${r}`,
          size: st.size,
          updatedAt: st.mtime.toISOString(),
        });
      }
    }
  }
  await walk(root, "");
  return out.sort((a, b) => a.name.localeCompare(b.name));
}
