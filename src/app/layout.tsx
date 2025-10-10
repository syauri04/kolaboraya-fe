import type { Metadata } from "next";
import { Inclusive_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inclusiveSans = Inclusive_Sans({
  variable: "--font-inclusive-sans",
  subsets: ["latin"],
});

const bruliaFont = localFont({
  src: "../fonts/Brulia-Display.otf",
  variable: "--font-bruliafont",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kolaboraya",
  description: "adalah platform sekaligus pendekatan gerakan kolektif yang hadir sebagai respons terhadap berbagai krisis global yang kita hadapi, seperti krisis iklim, krisis pangan, krisis air, krisis energi, dan krisis demokrasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inclusiveSans.variable} ${bruliaFont.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
