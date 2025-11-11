import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Clothica - Інтернет магазин одягу",
  description: "Ваш стиль з Clothica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}