import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OffersContent } from "@/components/shared/offers-content";

export const metadata = { title: "Deals & Offers — Up to 41% Off | Wanderlust" };

export default function OffersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <OffersContent />
      </main>
      <Footer />
    </>
  );
}
