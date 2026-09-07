"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Bitta CMS hujjatini tahrirlash: mahalliy holat + saqlash + «saqlanmagan» nazorati */
export function useDocEditor<T>(cmsKey: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const baseline = useRef(JSON.stringify(initial));

  const dirty = JSON.stringify(value) !== baseline.current;

  // Saqlanmagan o'zgarish bilan sahifadan chiqishga urinsa — ogohlantirish
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const save = useCallback(async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: cmsKey, value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Saqlashda xato");
        return false;
      }
      baseline.current = JSON.stringify(value);
      setSavedAt(new Date().toLocaleTimeString("uz-UZ"));
      return true;
    } catch {
      setError("Tarmoq xatosi — saqlanmadi");
      return false;
    } finally {
      setSaving(false);
    }
  }, [cmsKey, value]);

  const reset = useCallback(() => {
    setValue(JSON.parse(baseline.current) as T);
    setError("");
  }, []);

  return { value, setValue, dirty, saving, error, savedAt, save, reset };
}
