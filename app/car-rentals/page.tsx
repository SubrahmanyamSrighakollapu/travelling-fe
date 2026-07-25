import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CarRentalsContent } from "@/components/shared/car-rentals-content";

export const metadata = { title: "Car Rentals — Drive Your Way | Wanderlust" };

export default function CarRentalsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <CarRentalsContent />
      </main>
      <Footer />
    </>
  );
}
