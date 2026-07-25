import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HotelsContent } from "@/components/search/hotels-content";

export const metadata = { title: "Search Hotels — Best Rates Guaranteed" };

export default function HotelsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <HotelsContent />
      </main>
      <Footer />
    </>
  );
}
