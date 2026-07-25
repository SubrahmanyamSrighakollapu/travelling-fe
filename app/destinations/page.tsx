import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DestinationsContent } from "@/components/search/destinations-content";

export const metadata = { title: "Explore Destinations — 190+ Places to Discover" };

export default function DestinationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <DestinationsContent />
      </main>
      <Footer />
    </>
  );
}
