import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CruisesContent } from "@/components/shared/cruises-content";

export const metadata = { title: "Luxury Cruises — Ocean & River | Wanderlust" };

export default function CruisesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <CruisesContent />
      </main>
      <Footer />
    </>
  );
}
