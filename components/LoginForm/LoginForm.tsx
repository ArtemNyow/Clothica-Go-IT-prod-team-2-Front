'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import toast from 'react-hot-toast';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';
import css from './LoginForm.module.css';
import { fetchUserProfile } from '@/lib/api/clientApi';

const schema = Yup.object({
  phone: Yup.string()
    .required('Введіть номер телефону')
    .matches(
      /^\+?3?8?(0\d{9})$/,
      'Некоректний номер телефону'
    )
    .min(9, 'Номер телефону занадто короткий')
    .max(15, 'Номер телефону занадто довгий'),
  password: Yup.string().required('Введіть пароль'),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const setUser = useAuthStore(s => s.setUser);

  const handleSubmit = async (
    values: { phone: string; password: string },
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const user: User = await login(
        values.phone,
        values.password
      );
      setUser(user);

      try {
        const freshUser = await fetchUserProfile();
        setUser(freshUser);
      } catch {
        console.log('Could not fetch fresh user');
      }

      toast.success('Вітаємо, вхід успішно виконано!');
      router.push(redirect);
    } catch (err: any) {
      let errorMessage = 'Помилка входу';

      if (err?.response) {
        switch (err.response.status) {
          case 401:
            errorMessage =
              'Невірний номер телефону або пароль';
            break;
          case 400:
            errorMessage =
              'Неправильний запит. Перевірте дані';
            break;
          case 500:
            errorMessage =
              'Помилка на сервері. Спробуйте пізніше';
            break;
          default:
            errorMessage =
              err.response.data?.message || errorMessage;
        }
      } else if (err?.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <div className={css.tabs}>
          <Link href="/auth/register" className={css.tab}>
            Реєстрація
          </Link>
          <Link
            href="/auth/login"
            className={`${css.tab} ${css.tabActive}`}
          >
            Вхід
          </Link>
        </div>

        <div className={css.header}>
          <h1 className={css.title}>Вхід</h1>
        </div>

        <Formik
          initialValues={{ phone: '', password: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.formGroup}>
                <label
                  htmlFor="phone"
                  className={css.label}
                >
                  Номер телефону*
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+38 (0__) ___-__-__"
                  className={css.input}
                />
                <ErrorMessage
                  name="phone"
                  component="span"
                  className={css.errorText}
                />
              </div>

              <div className={css.formGroup}>
                <label
                  htmlFor="password"
                  className={css.label}
                >
                  Пароль*
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  className={css.input}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.errorText}
                />
              </div>

              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Вхід...' : 'Увійти'}
              </button>
            </Form>
          )}
        </Formik>

        <div className={css.footer}>
          <p className={css.footerText}>
            © 2025 Clothica. Всі права захищені.
          </p>
        </div>
      </div>
    </div>
  );
}
