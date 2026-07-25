import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PackagesContent } from "@/components/search/packages-content";

export const metadata = { title: "Holiday Packages — Curated Travel Deals" };

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <PackagesContent />
      </main>
      <Footer />
    </>
  );
}
