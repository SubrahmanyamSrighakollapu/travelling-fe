import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ToursContent } from "@/components/shared/tours-content";

export const metadata = { title: "Tours & Experiences — Wanderlust" };

export default function ToursPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <ToursContent />
      </main>
      <Footer />
    </>
  );
}
