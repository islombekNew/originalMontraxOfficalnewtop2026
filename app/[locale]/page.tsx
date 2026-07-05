import { setRequestLocale } from "next-intl/server";
import { getCaseStudies, designWorks } from "@/lib/work";
import Hero from "@/components/home/Hero";
import ExpertiseStrip from "@/components/home/ExpertiseStrip";
import FeaturedWork from "@/components/home/FeaturedWork";
import DesignStrip from "@/components/home/DesignStrip";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import CTASection from "@/components/home/CTASection";
import StackSection from "@/components/StackSection";

/** Home — sticky stack tuzilishi.
 *  Hero → Featured → Design → About → Services → CTA — har biri sticky, keyingisi ustiga siljiydi. */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featured = getCaseStudies(locale).slice(0, 3);

  return (
    <div className="stack-root relative">
      {/* Hero — sticky emas, oddiy tepada. Keyingi bo'limlar ustiga chiqadi. */}
      <Hero />

      {/* Yo'nalishlar marquee — dasturchilik · dizayn · SMM · vibe coding */}
      <ExpertiseStrip />

      <StackSection index={1}>
        <FeaturedWork featured={featured} />
      </StackSection>

      <StackSection index={2}>
        <DesignStrip works={designWorks.slice(0, 8)} />
      </StackSection>

      <StackSection index={3}>
        <AboutTeaser />
      </StackSection>

      <StackSection index={4}>
        <ServicesTeaser />
      </StackSection>

      <StackSection index={5}>
        <CTASection />
      </StackSection>
    </div>
  );
}
