'use client';

import { sendSubscription } from '@/lib/api/clientApi';
import css from './Footer.module.css';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import Link from 'next/link';

const subscriptionSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невірний формат email')
    .required('Email обов’язковий'),
});

export default function Footer() {
  const handleSubmit = async (
    values: { email: string },
    { resetForm }: any
  ) => {
    if (!values.email) return;
    try {
      const message = await sendSubscription(values.email);
      toast.success(message);
      resetForm();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.containerFooter}>
          <div className={css.containerFooterFirst}>
            <div className={css.footerFirstPartFirst}>
              <Link className={css.logoFooter} href="/">
                <img
                  className={css.imgLogoFooter}
                  src="/logo.svg"
                  alt="logo"
                />
              </Link>
              <div className={css.footerItemsNavList}>
                <p className={css.footerItemsTitle}>Меню</p>
                <ul className={css.footerNavList}>
                  <li className={css.footerNavItem}>
                    <Link href="/">Головна</Link>
                  </li>
                  <li className={css.footerNavItem}>
                    <Link href="/goods">Товари</Link>
                  </li>
                  <li className={css.footerNavItem}>
                    <Link href="/categories">
                      Категорії
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className={css.footerFirstPartSecond}>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={subscriptionSchema}
                onSubmit={handleSubmit}
              >
                <Form className={css.footerForm}>
                  <div className={css.footerFormikForm}>
                    <p className={css.footerPartThirdTitle}>
                      Підписатися
                    </p>
                    <p className={css.footerPartThirdText}>
                      Приєднуйтесь до нашої розсилки, щоб
                      бути в курсі новин та акцій.
                    </p>
                    <div className={css.inputBtnWrap}>
                      <Field
                        className={css.fieldInput}
                        type="email"
                        name="email"
                        placeholder="Введіть ваш email"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        required
                      />
                      <button
                        className={css.btnFooter}
                        type="submit"
                      >
                        Підписатися
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>

          <div className={css.containerFooterSecond}>
            <p className={css.footerRights}>
              © 2025 Clothica. Всі права захищені.
            </p>
            <div className={css.footerSocial}>
              <ul className={css.socialListFooter}>
                <li className={css.socialFooter}>
                  <Link href="https://www.facebook.com/">
                    <svg width={50} height={50}>
                      <use href="/sprite.svg#icon-facebook" />
                    </svg>
                  </Link>
                </li>
                <li className={css.socialFooter}>
                  <Link href="https://www.instagram.com/">
                    <svg width={50} height={50}>
                      <use href="/sprite.svg#icon-instagram" />
                    </svg>
                  </Link>
                </li>
                <li className={css.socialFooter}>
                  <Link href="https://x.com/">
                    <svg width={50} height={50}>
                      <use href="/sprite.svg#icon-x" />
                    </svg>
                  </Link>
                </li>
                <li className={css.socialFooter}>
                  <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <svg width={50} height={50}>
                      <use href="/sprite.svg#icon-youtube" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
