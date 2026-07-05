import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/home/CTASection";
import FAQ from "@/components/FAQ";

/** MONTRAX xizmatlar va minimal narxlar — Janob bergan real narx-menyu.
 *  Narxni o'zgartirish: shu massivni tahrirlash yetarli. */
const CATEGORIES = [
  {
    key: "design",
    items: [
      { uz: "Logo dizayn", en: "Logo design", price: "60 000+" },
      { uz: "Instagram post / banner", en: "Instagram post / banner", price: "50 000+" },
      { uz: "Branding pack", en: "Branding pack", price: "140 000+" },
      { uz: "Thumbnail / reklama creative", en: "Thumbnail / ad creative", price: "50 000+" },
    ],
  },
  {
    key: "smm",
    items: [
      { uz: "Kontent plan (7–30 kun)", en: "Content plan (7–30 days)", price: "160 000+" },
      { uz: "Post yozish + dizayn", en: "Post copy + design", price: "60 000+" },
      { uz: "Instagram sahifa yuritish", en: "Instagram page management", price: "500 000+", monthly: true },
      { uz: "Reklama strategiya", en: "Ad strategy", price: "200 000+" },
    ],
  },
  {
    key: "ai",
    items: [
      { uz: "AI prompt yozish (oddiy)", en: "AI prompt writing (basic)", price: "40 000+" },
      { uz: "Maxsus AI workflow", en: "Custom AI workflow", price: "150 000+" },
      { uz: "AI chatbot setup", en: "AI chatbot setup", price: "260 000+" },
    ],
  },
  {
    key: "vibe",
    items: [
      { uz: "Landing page", en: "Landing page", price: "400 000+" },
      { uz: "Telegram bot", en: "Telegram bot", price: "111 000+" },
      { uz: "Mini avtomatlashtirish tizimlari", en: "Mini automation systems", price: "400 000+" },
    ],
  },
  {
    key: "web",
    items: [
      { uz: "CRM / boshqaruv tizimi", en: "CRM / management system", price: "600 000+" },
      { uz: "E-commerce", en: "E-commerce", price: "600 000+" },
      { uz: "Murakkab web ilova", en: "Complex web app", price: "600 000+" },
    ],
  },
] as const;

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
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <span className="inline-block h-px w-8 bg-accent" />
            MONTRAX
          </p>
          <h1 className="font-display text-h1">{t("title")}</h1>
          <p className="text-lead mt-4 max-w-xl text-muted">{t("sub")}</p>
        </Reveal>

        {/* Narx-menyu — editorial price table */}
        <div className="mt-20 flex flex-col gap-20">
          {CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.key} delay={ci * 0.05}>
              <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16">
                {/* Chap: kategoriya sarlavhasi */}
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-editorial text-4xl italic text-line-warm md:text-5xl">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-h2">
                      {ts(`${cat.key}.title`)}
                    </h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:max-w-xs">
                    {ts(`${cat.key}.desc`)}
                  </p>
                </div>

                {/* O'ng: item — narx qatorlari, nuqtali leader bilan */}
                <div className="divide-y divide-line border-y border-line">
                  {cat.items.map((item) => (
                    <div
                      key={item.uz}
                      className="group flex items-baseline gap-4 py-5 transition-colors"
                    >
                      <span className="text-base text-ink transition-colors group-hover:text-accent md:text-lg">
                        {isUz ? item.uz : item.en}
                      </span>
                      <span
                        aria-hidden
                        className="mx-1 flex-1 border-b border-dotted border-line-warm"
                      />
                      {"custom" in cat && cat.custom ? (
                        <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted">
                          {t("customPrice")}
                        </span>
                      ) : (
                        <span className="shrink-0 font-display text-lg font-semibold text-accent md:text-xl">
                          {item.price} {isUz ? "so'm" : "UZS"}
                          {"monthly" in item && item.monthly && (
                            <span className="text-sm font-normal text-muted">
                              {" "}
                              / {isUz ? "oy" : "mo"}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Izoh — narxlar minimal, aniq taklif suhbatdan keyin */}
        <Reveal>
          <p className="mt-14 max-w-2xl rounded-xl border border-line bg-surface px-6 py-5 text-sm leading-relaxed text-muted">
            {t("priceNote")}
          </p>
        </Reveal>

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
