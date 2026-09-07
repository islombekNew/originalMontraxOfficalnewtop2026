import { getSettings } from "@/lib/cms/read";
import PageHead from "@/components/admin/PageHead";
import SettingsEditor from "@/components/admin/SettingsEditor";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHead
        title="Havolalar & sozlama"
        hint="Telegram manzili, ijtimoiy tarmoqlar, sahifa rasmlari va tools ro'yxati."
      />
      <SettingsEditor initial={settings} />
    </>
  );
}
