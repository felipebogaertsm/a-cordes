import type { Metadata } from "next";
import { Inter, Lora, Merriweather } from "next/font/google";
import "./globals.css";

const sansFont = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serifFont = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "à cordes",
  description: "Fine instruments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sansFont.variable} ${serifFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
