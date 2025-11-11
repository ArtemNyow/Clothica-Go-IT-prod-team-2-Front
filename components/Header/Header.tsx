"use client";

import Link from "next/link";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>

        <Link href="/" className={css.logo}>
          Clothica
        </Link>

        <nav className={css.nav}>
          <Link href="/" className={css.link}>
            Головна
          </Link>
          <Link href="/goods" className={css.link}>
            Товари
          </Link>
          <Link href="/categories" className={css.link}>
            Категорії
          </Link>
        </nav>

        <AuthNavigation />
      </div>
    </header>
  );
}