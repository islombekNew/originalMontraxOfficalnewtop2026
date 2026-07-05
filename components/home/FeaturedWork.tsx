"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import WorkCard from "@/components/WorkCard";
import type { CaseMeta } from "@/lib/work-types";

export default function FeaturedWork({ featured }: { featured: CaseMeta[] }) {
  const t = useTranslations("featured");

  return (
    <section className="section-gap">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            serifWord={t("serifWord")}
            index="01"
            variant="numbered"
          />
          <Reveal>
            <Link href="/work" className="link-accent text-sm text-muted">
              {t("viewAll")} →
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <WorkCard key={item.slug} item={item} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
