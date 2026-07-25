import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardContent } from "@/components/shared/dashboard-content";

export const metadata = { title: "My Dashboard — Wanderlust" };

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 bg-slate-50 dark:bg-slate-950">
        <DashboardContent />
      </main>
      <Footer />
    </>
  );
}
