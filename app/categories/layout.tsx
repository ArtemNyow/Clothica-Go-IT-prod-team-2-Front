import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clothica – Категорії товарів',
  description:
    'Вибирайте товари за категоріями: одяг, взуття, аксесуари та інші в Clothica.',
  openGraph: {
    title: 'Clothica – Категорії товарів',
    description:
      'Вибирайте товари за категоріями: одяг, взуття, аксесуари та інші в Clothica.',
    type: 'website',
    url: 'https://clothica-go-it-prod-team-2-front.vercel.app/category',
    images: [
      {
        url: 'https://res.cloudinary.com/dp3cuetwm/image/upload/v1763552857/Gemini_Generated_Image_k7m762k7m762k7m7_bg4lsd.png',
        width: 1200,
        height: 630,
        alt: 'Clothica – категорії товарів',
      },
    ],
    locale: 'uk_UA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clothica – Категорії товарів',
    description:
      'Вибирайте товари за категоріями: одяг, взуття, аксесуари та інші в Clothica.',
    images: [
      'https://res.cloudinary.com/dp3cuetwm/image/upload/v1763552857/Gemini_Generated_Image_k7m762k7m762k7m7_bg4lsd.png',
    ],
  },
};

export default async function LayoutCategories({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
