'use client';

import { sendSubscription } from '@/lib/api/clientApi';
import css from './Footer.module.css';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-hot-toast';

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
              <a className={css.logoFooter} href="/">
                <img
                  className={css.imgLogoFooter}
                  src="/CompanyLogoFooter.svg"
                  alt="logo"
                />
              </a>
              <div className={css.footerItemsNavList}>
                <p className={css.footerItemsTitle}>Меню</p>
                <ul className={css.footerNavList}>
                  <li className={css.footerNavItem}>
                    <a href="/">Головна</a>
                  </li>
                  <li className={css.footerNavItem}>
                    <a href="/">Товари</a>
                  </li>
                  <li className={css.footerNavItem}>
                    <a href="/">Категорії</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={css.footerFirstPartSecond}>
              <Formik
                initialValues={{ email: '' }}
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
                  <a href="https://www.facebook.com/">
                    <img
                      src="/facebook.svg"
                      alt="Facebook"
                    />
                  </a>
                </li>
                <li className={css.socialFooter}>
                  <a href="https://www.instagram.com/">
                    <img
                      src="/instagram.svg"
                      alt="Instagram"
                    />
                  </a>
                </li>
                <li className={css.socialFooter}>
                  <a href="https://x.com/">
                    <img src="/x.svg" alt="X" />
                  </a>
                </li>
                <li className={css.socialFooter}>
                  <a href="https://www.youtube.com/">
                    <img src="/youtube.svg" alt="Youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
