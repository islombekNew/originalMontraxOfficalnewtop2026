import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/cms/read";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("contactTitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const { telegramUrl, social } = await getSettings();
  const handle = `@${telegramUrl.replace(/\/+$/, "").split("/").pop() ?? ""}`;
  const otherLinks = social.filter(
    (s) => s.visible !== false && s.href && s.href !== telegramUrl
  );

  return (
    <div className="container-x pt-36 pb-24">
      <Reveal>
        <h1 className="font-display text-h1">{t("title")}</h1>
        <p className="text-lead mt-4 max-w-xl text-muted">{t("sub")}</p>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {/* Telegram — asosiy kanal */}
        <Reveal>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col justify-between rounded-xl border border-accent/30 bg-surface p-8 transition-colors duration-400 hover:border-accent"
            data-cursor
          >
            <div>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                <path d="M22 2 11 13" />
              </svg>
              <h2 className="font-display mt-6 text-h2">
                {t("telegramTitle")}
              </h2>
              <p className="mt-2 text-sm text-muted">{t("telegramDesc")}</p>
            </div>
            <span className="mt-8 inline-block text-lg font-medium text-accent transition-transform duration-300 group-hover:translate-x-1.5">
              {handle} →
            </span>
          </a>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>

      {/* Boshqa kanallar */}
      <Reveal className="mt-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {t("socialTitle")}
        </p>
        <div className="mt-4 flex flex-wrap gap-6 text-sm">
          {otherLinks.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent text-muted"
            >
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
