import { getSections } from "@/lib/cms/read";
import PageHead from "@/components/admin/PageHead";
import SectionsEditor from "@/components/admin/SectionsEditor";

export const dynamic = "force-dynamic";

export default async function AdminSectionsPage() {
  const sections = await getSections();

  return (
    <>
      <PageHead
        title="Bosh sahifa bo'limlari"
        hint="Bosh sahifadagi bloklarni yashirish yoki joyini almashtirish. Bo'limning ichidagi matnni «Matnlar» bo'limidan o'zgartirasiz."
      />
      <SectionsEditor initial={sections} />
    </>
  );
}
