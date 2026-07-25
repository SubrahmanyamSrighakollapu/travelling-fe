import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WishlistContent } from "@/components/shared/wishlist-content";

export const metadata = { title: "My Wishlist — Wanderlust" };

export default function WishlistPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <WishlistContent />
      </main>
      <Footer />
    </>
  );
}
