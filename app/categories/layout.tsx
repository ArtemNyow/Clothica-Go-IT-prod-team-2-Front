import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Категорії',
  description: 'Список категорій',
};

export default async function LayoutCategories({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>

      <Footer />
    </div>
  );
}
