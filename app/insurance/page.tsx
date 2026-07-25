import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InsuranceContent } from "@/components/shared/insurance-content";

export const metadata = { title: "Travel Insurance — Comprehensive Coverage | Wanderlust" };

export default function InsurancePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <InsuranceContent />
      </main>
      <Footer />
    </>
  );
}
