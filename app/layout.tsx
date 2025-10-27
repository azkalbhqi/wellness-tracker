import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Wellness Tracker Dashboard",
  description: "by EmergencyyCall",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nunito.variable} antialiased`}
      >
        <Navbar />
        <div>
          {/* Spacer to offset fixed navbar height */}
          <div className="h-16 md:h-16" />
        </div>
        {children}
      </body>
    </html>
  );
}
