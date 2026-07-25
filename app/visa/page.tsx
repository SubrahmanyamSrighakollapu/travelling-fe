import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VisaContent } from "@/components/shared/visa-content";

export const metadata = { title: "Visa Services — Fast & Reliable | Wanderlust" };

export default function VisaPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <VisaContent />
      </main>
      <Footer />
    </>
  );
}
