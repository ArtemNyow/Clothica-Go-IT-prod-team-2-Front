'use client';

import { useEffect, useState } from 'react';
import css from './Header.module.css';
import Link from 'next/link';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const pathname = usePathname();

  const openMenu = () => setIsOpenMenu(true);
  const closeMenu = () => setIsOpenMenu(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add(css.noScroll);
    } else {
      document.body.classList.remove(css.noScroll);
    }

    return () => {
      document.body.classList.remove(css.noScroll);
    };
  }, [isOpenMenu]);

  const navClass = `${css.navMobile} ${isOpenMenu ? css.show : ''}`;

  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.group}>
          <Link href="/" className={css.logo}>
            <svg
              className={css.iconlogo}
              width={84}
              height={36}
            >
              <use href="/logo.svg"></use>
            </svg>
          </Link>

          <nav className={css.nav}>
            <ul className={css.listNav}>
              <li>
                <Link
                  onClick={closeMenu}
                  className={css.link}
                  href="/"
                >
                  Головна
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenu}
                  className={css.link}
                  href="/goods"
                >
                  Товари
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenu}
                  className={css.link}
                  href="/categories"
                >
                  Категорії
                </Link>
              </li>
            </ul>
            <AuthNavigation onLinkClick={closeMenu} />
          </nav>
        </div>

        <div className={css.toggle}>
          {!isOpenMenu ? (
            <button
              type="button"
              onClick={openMenu}
              className={css.menu}
            >
              <svg
                className={css.iconMenu}
                width="19"
                height="13"
              >
                <use href="/sprite.svg/#icon-mobile-menu"></use>
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={closeMenu}
              className={css.close}
            >
              <svg
                width="14"
                height="14"
                className={css.iconClose}
              >
                <use href="/sprite.svg/#icon-close"></use>
              </svg>
            </button>
          )}

          <Link href="/order" className={css.basket}>
            <svg
              className={css.iconBasket}
              width="20"
              height="21"
            >
              <use href="/sprite.svg/#icon-basket"></use>
            </svg>
            <span className={css.count}>1</span>
          </Link>
        </div>
      </div>

      <nav className={navClass}>
        <ul className={css.listNavMobile}>
          <li>
            <Link
              onClick={closeMenu}
              className={css.link}
              href="/"
            >
              Головна
            </Link>
          </li>
          <li>
            <Link
              onClick={closeMenu}
              className={css.link}
              href="/goods"
            >
              Товари
            </Link>
          </li>
          <li>
            <Link
              onClick={closeMenu}
              className={css.link}
              href="/categories"
            >
              Категорії
            </Link>
          </li>
        </ul>

        <AuthNavigation onLinkClick={closeMenu} />
      </nav>
    </header>
  );
}
