import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/shared/about-content";

export const metadata = { title: "About Us — Wanderlust" };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
