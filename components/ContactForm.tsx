"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-300";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        required
        maxLength={100}
        placeholder={t("formName")}
        className={inputCls}
      />
      <input
        name="contact"
        maxLength={100}
        placeholder={t("formContact")}
        className={inputCls}
      />
      <textarea
        name="message"
        required
        maxLength={2000}
        rows={5}
        placeholder={t("formMessage")}
        className={inputCls}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink px-8 py-3.5 font-medium text-paper transition-all duration-300 hover:scale-[1.02] hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? t("formSending") : t("formSubmit")}
      </button>

      {status === "success" && (
        <p className="text-sm text-accent">{t("formSuccess")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{t("formError")}</p>
      )}
    </form>
  );
}
