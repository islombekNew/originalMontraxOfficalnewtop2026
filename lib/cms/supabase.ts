import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Supabase ulanishi — faqat server tarafda.
 *  O'qish: anon kalit (RLS: hamma o'qiy oladi).
 *  Yozish: service role kalit (faqat admin API route'larida). */

const URL = process.env.SUPABASE_URL?.trim() || "";
const ANON = process.env.SUPABASE_ANON_KEY?.trim() || "";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

export const CMS_TABLE = "cms_docs";
export const MEDIA_BUCKET = "media";

/** Supabase o'qish uchun sozlanganmi */
export function supabaseReadEnabled() {
  return Boolean(URL && (ANON || SERVICE));
}

/** Supabase yozish uchun sozlanganmi (service role kerak) */
export function supabaseWriteEnabled() {
  return Boolean(URL && SERVICE);
}

let readClient: SupabaseClient | null = null;
let writeClient: SupabaseClient | null = null;

const opts = { auth: { persistSession: false, autoRefreshToken: false } };

export function supabaseRead(): SupabaseClient | null {
  if (!supabaseReadEnabled()) return null;
  if (!readClient) readClient = createClient(URL, SERVICE || ANON, opts);
  return readClient;
}

export function supabaseWrite(): SupabaseClient | null {
  if (!supabaseWriteEnabled()) return null;
  if (!writeClient) writeClient = createClient(URL, SERVICE, opts);
  return writeClient;
}

/** Storage'dagi fayl uchun ochiq URL */
export function publicMediaUrl(path: string) {
  return `${URL}/storage/v1/object/public/${MEDIA_BUCKET}/${path}`;
}

export function supabaseHost() {
  try {
    return new global.URL(URL).host;
  } catch {
    return "";
  }
}
