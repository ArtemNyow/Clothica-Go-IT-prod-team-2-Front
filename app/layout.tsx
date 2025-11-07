import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'modern-normalize';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"], 
});


export const metadata: Metadata = {
  title: "Clothica",
  description: "Clothing store",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
    modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <TanStackProvider>
        <Header/>
        {children}
        {modal}
        <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
