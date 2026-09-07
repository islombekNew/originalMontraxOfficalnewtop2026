import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/home/CTASection";
import FAQ from "@/components/FAQ";
import { getFaq, getMessages, getPricing } from "@/lib/cms/read";

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
  const isUz = locale === "uz";

  /* Narx-menyu va savollar admin paneldan keladi */
  const [categories, faq, messages] = await Promise.all([
    getPricing(),
    getFaq(),
    getMessages(isUz ? "uz" : "en"),
  ]);

  const services = (messages.services ?? {}) as Record<
    string,
    { title?: string; desc?: string }
  >;

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
          {categories.map((cat, ci) => {
            const fromMessages = services[cat.key] ?? {};
            const title =
              (isUz ? cat.titleUz : cat.titleEn) || fromMessages.title || cat.key;
            const desc =
              (isUz ? cat.descUz : cat.descEn) || fromMessages.desc || "";

            return (
              <Reveal key={cat.id} delay={ci * 0.05}>
                <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16">
                  {/* Chap: kategoriya sarlavhasi */}
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-editorial text-4xl italic text-line-warm md:text-5xl">
                        {String(ci + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-h2">{title}</h2>
                    </div>
                    {desc && (
                      <p className="mt-4 text-sm leading-relaxed text-muted md:max-w-xs">
                        {desc}
                      </p>
                    )}
                  </div>

                  {/* O'ng: item — narx qatorlari, nuqtali leader bilan */}
                  <div className="divide-y divide-line border-y border-line">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-baseline gap-4 py-5 transition-colors"
                      >
                        <span className="text-base text-ink transition-colors group-hover:text-accent md:text-lg">
                          {isUz ? item.uz : item.en}
                        </span>
                        <span
                          aria-hidden
                          className="mx-1 flex-1 border-b border-dotted border-line-warm"
                        />
                        {item.custom ? (
                          <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted">
                            {t("customPrice")}
                          </span>
                        ) : (
                          <span className="shrink-0 font-display text-lg font-semibold text-accent md:text-xl">
                            {item.price} {isUz ? "so'm" : "UZS"}
                            {item.monthly && (
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
            );
          })}
        </div>

        {/* Izoh — narxlar minimal, aniq taklif suhbatdan keyin */}
        <Reveal>
          <p className="mt-14 max-w-2xl rounded-xl border border-line bg-surface px-6 py-5 text-sm leading-relaxed text-muted">
            {t("priceNote")}
          </p>
        </Reveal>

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="section-gap pb-0">
            <Reveal>
              <h2 className="font-display text-h2">{t("faqTitle")}</h2>
            </Reveal>
            <FAQ
              items={faq.map((f) => ({
                q: isUz ? f.uzQ : f.enQ,
                a: isUz ? f.uzA : f.enA,
              }))}
            />
          </section>
        )}
      </div>

      <CTASection />
    </>
  );
}
