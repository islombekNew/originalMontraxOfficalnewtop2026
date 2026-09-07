import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getMessages } from "@/lib/cms/read";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  /* Matnlar admin paneldan keladi; CMS bo'sh bo'lsa messages/*.json ishlatiladi */
  return {
    locale,
    messages: (await getMessages(locale)) as Record<string, unknown>,
  };
});
