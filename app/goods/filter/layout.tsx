import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function FilterLayout({ children }: Props) {
  return <>{children}</>; 
}