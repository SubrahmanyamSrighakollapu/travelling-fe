import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const themeInitScript = `
  (() => {
    try {
      const stored = window.localStorage.getItem("wanderlust-ui");
      const parsed = stored ? JSON.parse(stored) : null;
      const savedTheme = parsed?.state?.theme;
      const theme = savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  })();
`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bharat Connect — Retailer Operations Portal",
    template: "%s | Bharat Connect",
  },
  description: "Bharat Connect BBPS Retailer Operations Node and Travel Platform.",
  keywords: ["bbps", "bharat connect", "bill pay", "retailer portal", "travel"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bharatconnect.in",
    siteName: "Bharat Connect",
    title: "Bharat Connect — Retailer Operations Portal",
    description: "Bharat Connect BBPS Retailer Operations Portal.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Connect — Retailer Operations Portal",
    description: "Discover, plan, and book extraordinary journeys.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
