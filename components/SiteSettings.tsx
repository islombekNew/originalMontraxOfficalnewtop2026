"use client";

import { createContext, useContext } from "react";
import { defaultSettings } from "@/lib/cms/defaults";
import type { SettingsDoc } from "@/lib/cms/types";

/** Telegram havolasi, ijtimoiy tarmoqlar va rasmlar — admin paneldan.
 *  Client komponentlar shu kontekst orqali oladi. */
const Ctx = createContext<SettingsDoc>(defaultSettings);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SettingsDoc;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteSettings() {
  return useContext(Ctx);
}

/** Ko'rinadigan ijtimoiy havolalar */
export function useSocialLinks() {
  return useSiteSettings().social.filter((s) => s.visible !== false && s.href);
}
