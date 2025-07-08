import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ApolloWrapper } from "@/components/apollo-wrapper";

export const metadata: Metadata = {
  title: "Discover 5-Color Palettes Extracted from Real Images",
  description:
    "HiColors is a community-driven color palette library. Browse thousands of 5-color palettes extracted from anime characters, artworks, games, and user-uploaded images. Perfect for designers, illustrators, and color lovers.",
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
        <ApolloWrapper>
          <Header />
          {children}
          <Toaster richColors />
        </ApolloWrapper>
      </body>
    </html>
  );
}
