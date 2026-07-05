import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCaseStudies, designWorks } from "@/lib/work";
import WorkGrid from "@/components/WorkGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("workTitle") };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");

  const cases = getCaseStudies(locale);

  return (
    <div className="container-x pt-36 pb-24">
      <h1 className="font-display text-h1">{t("title")}</h1>
      <p className="text-lead mt-4 max-w-xl text-muted">{t("sub")}</p>

      <WorkGrid cases={cases} designs={designWorks} />
    </div>
  );
}
