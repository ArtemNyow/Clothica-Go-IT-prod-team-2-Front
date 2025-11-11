import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'modern-normalize';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import ToastProvider from '@/components/ToastProvider/ToastProvider';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Clothica - Інтернет магазин одягу',
  description: 'Ваш стиль з Clothica',
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
          <ToastProvider />
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
