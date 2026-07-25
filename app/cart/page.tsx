import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartContent } from "@/components/shared/cart-content";

export const metadata = { title: "Your Cart — Wanderlust" };

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <CartContent />
      </main>
      <Footer />
    </>
  );
}
