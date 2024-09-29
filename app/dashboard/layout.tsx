import DashboardPanelLayout from "@/components/dashboard/panel-layout";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <DashboardPanelLayout>{children}</DashboardPanelLayout>;
}