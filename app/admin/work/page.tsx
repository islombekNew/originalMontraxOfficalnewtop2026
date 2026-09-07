import { getWorkItems } from "@/lib/cms/read";
import PageHead from "@/components/admin/PageHead";
import WorkEditor from "@/components/admin/WorkEditor";

export const dynamic = "force-dynamic";

export default async function AdminWorkPage() {
  const items = await getWorkItems();

  return (
    <>
      <PageHead
        title="Ishlar"
        hint="Portfolio loyihalari. Tartibni ↑ ↓ bilan o'zgartirasiz — birinchi uchtasi bosh sahifada ko'rinadi. «Saytda ko'rsatilsin» belgisini olib qo'ysangiz loyiha vaqtincha yashiriladi."
      />
      <WorkEditor initial={items} />
    </>
  );
}
