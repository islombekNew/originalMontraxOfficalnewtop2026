import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "en"],
  defaultLocale: "uz",
});

export type Locale = (typeof routing.locales)[number];
