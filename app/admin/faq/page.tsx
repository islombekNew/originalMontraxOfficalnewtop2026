import { getRawDoc } from "@/lib/cms/read";
import { defaultFaq } from "@/lib/cms/defaults";
import { CMS_KEYS, type FaqItem } from "@/lib/cms/types";
import PageHead from "@/components/admin/PageHead";
import FaqEditor from "@/components/admin/FaqEditor";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const items = await getRawDoc<FaqItem[]>(CMS_KEYS.faq, defaultFaq);

  return (
    <>
      <PageHead
        title="Savol-javob"
        hint="Xizmatlar sahifasi oxiridagi ko'p so'raladigan savollar. Nechta bo'lsa ham bo'ladi — qo'shish va o'chirish erkin."
      />
      <FaqEditor initial={items} />
    </>
  );
}
