import type { Metadata, Viewport } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { company } from "@/data/company";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

/** Display face for headings — Arabic + Latin */
const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} | لافي تورز — سياحة داخلية وحجز تذاكر طيران`,
    template: `%s · ${company.name}`,
  },
  description: "LAVIE TOURS — شركة سياحة داخلية وحجز تذاكر طيران من القاهرة. عروض فنادق ومنتجعات في العلمين الجديدة والعين السخنة. للحجز والاستعلام اتصال أو واتساب.",
};

export const viewport: Viewport = {
  themeColor: "#123247",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${plexArabic.variable} ${alexandria.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-clip">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
