import { Sidebar } from "@/components/dashboard/sidebar";

export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-muted/30">{children}</main>
    </div>
  );
}