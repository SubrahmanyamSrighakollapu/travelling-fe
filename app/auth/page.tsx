import { Navbar } from "@/components/layout/navbar";
import { AuthContent } from "@/components/shared/auth-content";

export const metadata = { title: "Sign In — Wanderlust" };

export default function AuthPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen mesh-bg flex items-center justify-center pt-20 pb-12 px-4">
        <AuthContent />
      </main>
    </>
  );
}
