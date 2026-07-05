import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/home/CTASection";
import FAQ from "@/components/FAQ";

/** Narxlar — Janob tasdiqlashi kerak bo'lgan diapazoni.
 *  O'zgartirish: shu massivni tahrirlash yetarli. */
const PRICING = [
  {
    key: "web",
    priceUz: "5 mln so'mdan",
    priceEn: "from $400",
    durationUz: "3–6 hafta",
    durationEn: "3–6 weeks",
    exampleUz: "Mix Mobile CRM — telefon do'koni uchun inventar va savdo tizimi",
    exampleEn: "Mix Mobile CRM — inventory & sales system for a phone store",
    itemsUz: ["CRM / boshqaruv tizimi", "Landing / biznes sayt", "E-commerce"],
    itemsEn: ["CRM / management system", "Landing / business site", "E-commerce"],
  },
  {
    key: "design",
    priceUz: "100 ming so'mdan",
    priceEn: "from $10",
    durationUz: "1–3 kun",
    durationEn: "1–3 days",
    exampleUz: "YouTube thumbnail seriyalari — telefon obzor kanali uchun",
    exampleEn: "YouTube thumbnail series for a phone review channel",
    itemsUz: ["YouTube thumbnail", "Poster / banner", "E-commerce card", "Brand identity"],
    itemsEn: ["YouTube thumbnail", "Poster / banner", "E-commerce card", "Brand identity"],
  },
  {
    key: "bot",
    priceUz: "1.5 mln so'mdan",
    priceEn: "from $120",
    durationUz: "1–2 hafta",
    durationEn: "1–2 weeks",
    exampleUz: "KinoDam — kino qidiruv va yetkazish boti",
    exampleEn: "KinoDam — movie search & delivery bot",
    itemsUz: ["Kontent bot", "Buyurtma bot", "CRM integratsiya"],
    itemsEn: ["Content bot", "Order intake bot", "CRM integration"],
  },
  {
    key: "vibe",
    priceUz: "2 mln so'mdan",
    priceEn: "from $150",
    durationUz: "3–7 kun",
    durationEn: "3–7 days",
    exampleUz: "Shu portfolio sayti — Next.js + Three.js, AI tool'lar bilan tez qurilgan",
    exampleEn: "This very portfolio — Next.js + Three.js, built fast with AI tools",
    itemsUz: ["Startup MVP", "Ichki tool / dashboard", "Tezkor landing", "Prototip"],
    itemsEn: ["Startup MVP", "Internal tool / dashboard", "Quick landing", "Prototype"],
  },
  {
    key: "smm",
    priceUz: "1 mln so'mdan / oyiga",
    priceEn: "from $80/mo",
    durationUz: "Oylik hamkorlik",
    durationEn: "Monthly partnership",
    exampleUz: "Telefon do'koni kanali — kontent reja + post dizayn + yuritish",
    exampleEn: "Phone store channel — content plan + post design + management",
    itemsUz: ["Kontent reja", "Post / stories dizayn", "Kanal yuritish", "Statistika hisobot"],
    itemsEn: ["Content plan", "Post / stories design", "Channel management", "Analytics report"],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("servicesTitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");
  const ts = await getTranslations("services");
  const isUz = locale === "uz";

  return (
    <>
      <div className="container-x pt-36 pb-24">
        <Reveal>
          <h1 className="font-display text-h1">{t("title")}</h1>
          <p className="text-lead mt-4 max-w-xl text-muted">{t("sub")}</p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6">
          {PRICING.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.06}>
              <div className="grid gap-6 rounded-xl border border-line bg-surface p-7 transition-colors duration-400 hover:border-accent/40 md:grid-cols-[1.2fr_1fr_1fr] md:p-10">
                <div>
                  <h2 className="font-display text-h2">
                    {ts(`${p.key}.title`)}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {ts(`${p.key}.desc`)}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {(isUz ? p.itemsUz : p.itemsEn).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-center gap-5 border-line md:border-l md:pl-8">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted">
                      {t("priceFrom")}
                    </div>
                    <div className="font-display mt-1 text-2xl font-semibold text-accent">
                      {isUz ? p.priceUz : p.priceEn}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted">
                      {t("duration")}
                    </div>
                    <div className="mt-1 text-sm">
                      {isUz ? p.durationUz : p.durationEn}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center border-line md:border-l md:pl-8">
                  <div className="text-xs uppercase tracking-widest text-muted">
                    {t("example")}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {isUz ? p.exampleUz : p.exampleEn}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <section className="section-gap pb-0">
          <Reveal>
            <h2 className="font-display text-h2">{t("faqTitle")}</h2>
          </Reveal>
          <FAQ
            items={[1, 2, 3, 4].map((n) => ({
              q: t(`faq${n}q`),
              a: t(`faq${n}a`),
            }))}
          />
        </section>
      </div>

      <CTASection />
    </>
  );
}
