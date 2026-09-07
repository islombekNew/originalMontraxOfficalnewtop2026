import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSettings } from "@/lib/cms/read";
import { SITE_URL } from "@/lib/site";
import { SiteSettingsProvider } from "@/components/SiteSettings";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingTelegram from "@/components/FloatingTelegram";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Theme init — SSR flash'ni oldini olish uchun inline skript.
 *  <html>'ga data-theme atributini React hydratatsiyasidan oldin qo'yadi. */
const themeInitScript = `(function(){try{var t=localStorage.getItem('montrax-theme');if(!t){t='light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const settings = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: t("homeTitle"),
    description: t("homeDesc"),
    ...(settings.favicon ? { icons: { icon: settings.favicon } } : {}),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      type: "website",
      ...(settings.ogImage ? { images: [settings.ogImage] } : {}),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const settings = await getSettings();

  return (
    <html
      lang={locale}
      data-theme="light"
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      {/* suppressHydrationWarning: brauzer kengaytmalari body'ga atribut qo'shadi (cz-shortcut-listen) */}
      <body className="grain-overlay" suppressHydrationWarning>
        <NextIntlClientProvider>
          <SiteSettingsProvider value={settings}>
            <SmoothScroll>
              <ScrollProgress />
              <Cursor />
              <Nav />
              <main>{children}</main>
              <Footer />
              <FloatingTelegram />
            </SmoothScroll>
          </SiteSettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
