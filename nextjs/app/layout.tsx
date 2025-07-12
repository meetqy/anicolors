import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ApolloWrapper } from "@/components/apollo-wrapper";
import { Footer } from "@/components/footer";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Discover 5-Color Palettes Extracted from Real Images",
  description: "HiColors offers thousands of 5-color palettes, all extracted directly from diverse images like anime, art, and games. Ideal for designers, illustrators, and color lovers.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  twitter: {
    images: ["https://hicolors.org/og.jpg"],
  },
  openGraph: {
    images: ["https://hicolors.org/og.jpg"],
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <NextTopLoader color="#000" />
        <ApolloWrapper>
          <Header />
          {children}
          <Footer />
          <Toaster richColors />
        </ApolloWrapper>
      </body>
      <GoogleAnalytics gaId="G-CZV2BT21C2" />
    </html>
  );
}
