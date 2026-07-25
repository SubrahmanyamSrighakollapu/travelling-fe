import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CheckoutContent } from "@/components/shared/checkout-content";

export const metadata = { title: "Checkout — Wanderlust" };

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <CheckoutContent />
      </main>
      <Footer />
    </>
  );
}
