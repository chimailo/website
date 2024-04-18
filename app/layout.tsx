import Link from "next/link";
import { Asap, Playfair_Display } from "next/font/google";

import Header from "@/app/components/header";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { ThemeProvider } from "@/app/components/theme";
import "@/app/globals.css";

const asap = Asap({
  weight: ["400", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-asap",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans",
          asap.variable,
          playfair.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="#main"
              className="sr-only focus:not-sr-only focus:top-6 focus:left-6 focus:z-50 focus:absolute focus:h-11 focus:rounded-md focus:px-8"
            >
              Skip To Content
            </Link>
          </Button>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
