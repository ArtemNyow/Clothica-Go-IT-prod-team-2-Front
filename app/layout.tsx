import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'modern-normalize';
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import ToastProvider from "@/components/ToastProvider";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"], 
});


export const metadata: Metadata = {
  title: "Clothica",
  description: "Clothing store",
  icons: {
    icon: '/favicon.ico',
  },
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
        {children}
        <ToastProvider />
        {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
