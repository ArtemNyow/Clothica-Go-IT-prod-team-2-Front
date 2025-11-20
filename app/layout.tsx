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
  title: 'Clothica - Інтернет-магазин одягу',
  description:
    'Clothica – онлайн-магазин стильного чоловічого та жіночого одягу з доставкою по Україні.',
  keywords: [
    'одяг',
    'онлайн магазин',
    'стильний одяг',
    'Clothica',
  ],
  authors: [
    {
      name: 'Clothica',
      url: 'https://clothica-go-it-prod-team-2-front.vercel.app/',
    },
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Clothica - Інтернет-магазин одягу',
    description:
      'Clothica – онлайн-магазин стильного одягу для чоловіків і жінок.',
    url: 'https://clothica-go-it-prod-team-2-front.vercel.app/',
    siteName: 'Clothica',
    images: [
      {
        url: 'https://res.cloudinary.com/dp3cuetwm/image/upload/v1763551705/Gemini_Generated_Image_dvjofsdvjofsdvjo_w75fkh.png',
        width: 1200,
        height: 630,
        alt: 'Clothica – стильний одяг',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clothica - Інтернет-магазин одягу',
    description:
      'Clothica – онлайн-магазин стильного одягу для чоловіків і жінок.',
    images: [
      'https://res.cloudinary.com/dp3cuetwm/image/upload/v1763551705/Gemini_Generated_Image_dvjofsdvjofsdvjo_w75fkh.png',
    ],
    site: '@clothica',
    creator: '@clothica',
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
    <html lang="uk">
      <body className={geistSans.variable}>
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
