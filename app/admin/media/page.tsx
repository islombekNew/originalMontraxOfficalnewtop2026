import PageHead from "@/components/admin/PageHead";
import MediaLibrary from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <>
      <PageHead
        title="Rasmlar kutubxonasi"
        hint="Bu yerga yuklangan rasmlarni loyiha muqovasi, dizayn galereya yoki sahifa suratlari sifatida tanlash mumkin. Bitta fayl 8 MB gacha."
      />
      <MediaLibrary />
    </>
  );
}
