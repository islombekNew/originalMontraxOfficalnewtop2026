import { getMessages } from "@/lib/cms/read";
import PageHead from "@/components/admin/PageHead";
import TextsEditor from "@/components/admin/TextsEditor";

export const dynamic = "force-dynamic";

export default async function TextsPage() {
  const [uz, en] = await Promise.all([getMessages("uz"), getMessages("en")]);

  return (
    <>
      <PageHead
        title="Matnlar"
        hint="Saytdagi har bir sarlavha, tavsif va tugma yozuvi. Chapda o'zbekcha, o'ngda inglizcha — ikkalasi bir vaqtda saqlanadi. Bo'sh qoldirmang: bo'sh maydon saytda bo'sh joy bo'lib ko'rinadi."
      />
      <TextsEditor initialUz={uz} initialEn={en} />
    </>
  );
}
