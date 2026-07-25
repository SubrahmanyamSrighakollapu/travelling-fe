import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactContent } from "@/components/shared/contact-content";

export const metadata = { title: "Contact Us — Wanderlust" };

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
