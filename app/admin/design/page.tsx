import { getRawDoc } from "@/lib/cms/read";
import { defaultDesign } from "@/lib/cms/defaults";
import { CMS_KEYS, type DesignItem } from "@/lib/cms/types";
import PageHead from "@/components/admin/PageHead";
import DesignEditor from "@/components/admin/DesignEditor";

export const dynamic = "force-dynamic";

export default async function AdminDesignPage() {
  const items = await getRawDoc<DesignItem[]>(CMS_KEYS.design, defaultDesign);

  return (
    <>
      <PageHead
        title="Dizayn galereya"
        hint="Bosh sahifadagi sudraladigan lenta va Ishlar sahifasidagi grafik ishlar. Bir nechta rasmni bir vaqtda yuklash mumkin — o'lchamlar avtomatik aniqlanadi."
      />
      <DesignEditor initial={items} />
    </>
  );
}
