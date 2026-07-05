import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudy, getCaseSlugs, getCaseStudies } from "@/lib/work";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCaseSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudy(slug, locale);
  if (!cs) return {};
  return { title: `${cs.title} — MONTRAX`, description: cs.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cs = getCaseStudy(slug, locale);
  if (!cs) notFound();

  const t = await getTranslations("caseStudy");

  // Keyingi loyiha — tartib bo'yicha aylanma
  const all = getCaseStudies(locale);
  const idx = all.findIndex((c) => c.slug === slug);
  const next = all[(idx + 1) % all.length];

  const meta = [
    { label: t("client"), value: cs.client },
    { label: t("year"), value: cs.year },
    { label: t("role"), value: cs.role },
    { label: t("tools"), value: cs.tools.join(", ") },
  ];

  return (
    <article className="pt-24 pb-24">
      {/* Full-bleed hero */}
      <div className="relative aspect-[16/7] min-h-[320px] w-full overflow-hidden">
        <Image
          src={cs.cover}
          alt={cs.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        <div className="container-x absolute inset-x-0 bottom-8">
          <Link
            href="/work"
            className="link-accent mb-4 inline-block text-xs uppercase tracking-widest text-muted"
          >
            ← {t("backToWork")}
          </Link>
          <h1 className="font-display text-h1">{cs.title}</h1>
        </div>
      </div>

      {/* Meta strip */}
      <div className="container-x mt-10 grid grid-cols-2 gap-6 border-b border-line pb-10 md:grid-cols-4">
        {meta.map((m) => (
          <div key={m.label}>
            <div className="text-xs uppercase tracking-widest text-muted">
              {m.label}
            </div>
            <div className="mt-1.5 text-sm text-ink">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="container-x mt-14">
        <div className="prose-case">
          <MDXRemote source={cs.body} />
        </div>
      </div>

      {/* Next project */}
      {next && next.slug !== slug && (
        <div className="container-x mt-24 border-t border-line pt-12">
          <p className="text-xs uppercase tracking-widest text-muted">
            {t("nextProject")}
          </p>
          <Link
            href={`/work/${next.slug}`}
            className="group mt-3 inline-block"
            data-cursor
          >
            <span className="font-display text-h2 transition-colors duration-300 group-hover:text-accent">
              {next.title} →
            </span>
          </Link>
        </div>
      )}
    </article>
  );
}
