import { getMessages, getRawDoc } from "@/lib/cms/read";
import { defaultPricing } from "@/lib/cms/defaults";
import { CMS_KEYS, type PriceCategory } from "@/lib/cms/types";
import PageHead from "@/components/admin/PageHead";
import PricingEditor from "@/components/admin/PricingEditor";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const [items, uz] = await Promise.all([
    getRawDoc<PriceCategory[]>(CMS_KEYS.pricing, defaultPricing),
    getMessages("uz"),
  ]);

  const services = (uz.services ?? {}) as Record<string, { title?: string }>;
  const serviceTitles: Record<string, string> = {};
  for (const [k, v] of Object.entries(services)) {
    if (v && typeof v === "object" && typeof v.title === "string") {
      serviceTitles[k] = v.title;
    }
  }

  return (
    <>
      <PageHead
        title="Narx-menyu"
        hint="Xizmatlar sahifasidagi narxlar. Narxni matn sifatida yozing — «600 000+» yoki «kelishuv asosida» ham bo'ladi."
      />
      <PricingEditor initial={items} serviceTitles={serviceTitles} />
    </>
  );
}
