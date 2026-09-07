import type { Metadata } from "next";
import { isAuthed, adminPassSet } from "@/lib/cms/auth";
import { driverName } from "@/lib/cms/store";
import LoginScreen from "@/components/admin/LoginScreen";
import Shell from "@/components/admin/Shell";
import "./admin.css";

export const metadata: Metadata = {
  title: "MONTRAX — Boshqaruv paneli",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthed();
  const passSet = adminPassSet();

  return (
    <html lang="uz">
      <body>
        {authed ? (
          <Shell driver={driverName()}>{children}</Shell>
        ) : (
          <LoginScreen passSet={passSet} />
        )}
      </body>
    </html>
  );
}
