import type { Metadata } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/home/CTASection";

const TOOLS = [
  "Next.js 15", "TypeScript", "Prisma", "Tailwind CSS", "grammY",
  "NextAuth", "PostgreSQL", "Photoshop", "Figma", "ComfyUI / Flux",
  "GSAP", "Framer Motion",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("aboutTitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const hasPhoto = fs.existsSync(
    path.join(process.cwd(), "public", "media", "personal", "islombek.jpg")
  );

  const steps = [1, 2, 3] as const;

  return (
    <>
      <div className="container-x pt-36 pb-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div>
            <Reveal>
              <h1 className="font-display text-h1">{t("title")}</h1>
              <p className="text-lead mt-6 text-ink">{t("intro")}</p>
              <p className="mt-6 leading-relaxed text-muted">{t("story1")}</p>
              <p className="mt-4 leading-relaxed text-muted">{t("story2")}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-surface">
              {hasPhoto ? (
                <Image
                  src="/media/personal/islombek.jpg"
                  alt={t("photoAlt")}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface to-surface-2">
                  <span className="font-display text-7xl font-semibold text-line">
                    I
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Jarayon */}
        <section className="section-gap">
          <Reveal>
            <h2 className="font-display text-h2">{t("processTitle")}</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((n, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-line bg-surface p-7">
                  <span className="font-display text-4xl font-semibold text-accent/30">
                    0{n}
                  </span>
                  <h3 className="font-display mt-4 text-lg font-medium">
                    {t(`process${n}title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`process${n}desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="pb-16">
          <Reveal>
            <h2 className="font-display text-h2">{t("toolsTitle")}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      <CTASection />
    </>
  );
}
