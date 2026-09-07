import { setRequestLocale } from "next-intl/server";
import { getCaseStudies, getDesignWorks } from "@/lib/work";
import { getSections } from "@/lib/cms/read";
import Hero from "@/components/home/Hero";
import ExpertiseStrip from "@/components/home/ExpertiseStrip";
import FeaturedWork from "@/components/home/FeaturedWork";
import DesignStrip from "@/components/home/DesignStrip";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import CTASection from "@/components/home/CTASection";
import StackSection from "@/components/StackSection";

/** Home — sticky stack tuzilishi.
 *  Bo'limlar tartibi va ko'rinishi admin paneldan boshqariladi
 *  (Boshqaruv → Bosh sahifa bo'limlari). */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [cases, designs, sections] = await Promise.all([
    getCaseStudies(locale),
    getDesignWorks(),
    getSections(),
  ]);

  const featured = cases.slice(0, 3);
  const visible = sections.filter((s) => s.visible);

  /* Hero va lenta stack'dan tashqarida — qolganlari sticky panel */
  const showHero = visible.some((s) => s.key === "hero");
  const showExpertise = visible.some((s) => s.key === "expertise");

  const panels = visible
    .filter((s) => s.key !== "hero" && s.key !== "expertise")
    .map((s) => {
      switch (s.key) {
        case "featured":
          return featured.length ? (
            <FeaturedWork key={s.key} featured={featured} />
          ) : null;
        case "designStrip":
          return designs.length ? (
            <DesignStrip key={s.key} works={designs.slice(0, 8)} />
          ) : null;
        case "aboutTeaser":
          return <AboutTeaser key={s.key} />;
        case "servicesTeaser":
          return <ServicesTeaser key={s.key} />;
        case "cta":
          return <CTASection key={s.key} />;
        default:
          return null;
      }
    })
    .filter(Boolean);

  return (
    <div className="stack-root relative">
      {showHero && <Hero />}
      {showExpertise && <ExpertiseStrip />}

      {panels.map((panel, i) => (
        <StackSection key={i} index={i + 1}>
          {panel}
        </StackSection>
      ))}
    </div>
  );
}
