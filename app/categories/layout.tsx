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
      <main>{children}</main>
    </div>
  );
}
