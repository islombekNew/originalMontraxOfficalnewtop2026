import crypto from "crypto";
import { cookies } from "next/headers";

/** Admin sessiyasi — ADMIN_PASS asosidagi imzolangan cookie.
 *  Bitta foydalanuvchi (Islombek) uchun mo'ljallangan, DB kerak emas. */

export const ADMIN_COOKIE = "montrax_admin";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 kun

function secret() {
  const pass = process.env.ADMIN_PASS?.trim();
  if (!pass) return null;
  return crypto.createHash("sha256").update(`montrax:${pass}`).digest();
}

export function adminPassSet() {
  return Boolean(process.env.ADMIN_PASS?.trim());
}

function sign(payload: string, key: Buffer) {
  return crypto.createHmac("sha256", key).update(payload).digest("base64url");
}

export function createToken(): string | null {
  const key = secret();
  if (!key) return null;
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${sign(exp, key)}`;
}

export function verifyToken(token: string | undefined): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = sign(exp, key);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function checkPassword(input: string): boolean {
  const pass = process.env.ADMIN_PASS?.trim();
  if (!pass) return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(pass).digest();
  return crypto.timingSafeEqual(a, b);
}

/** Server komponent / route handler ichida: kirilganmi? */
export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(ADMIN_COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};
