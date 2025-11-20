'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';
import css from './RegistrationForm.module.css';
import { fetchUserProfile } from '@/lib/api/clientApi';

const schema = Yup.object({
  firstName: Yup.string()
    .max(32, "Ім'я не повинно перевищувати 32 символи")
    .required("Введіть ім'я"),
  phone: Yup.string()
    .required('Введіть номер телефону')
    .matches(
      /^\+?3?8?(0\d{9})$/,
      'Некоректний номер телефону'
    )
    .min(9, 'Номер телефону занадто короткий')
    .max(15, 'Номер телефону занадто довгий'),
  password: Yup.string()
    .min(8, 'Пароль повинен містити мінімум 8 символів')
    .max(128, 'Пароль не повинен перевищувати 128 символів')
    .required('Введіть пароль'),
});

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);

  const handleSubmit = async (
    values: {
      firstName: string;
      phone: string;
      password: string;
    },
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const user: User = await register({
        firstName: values.firstName,
        phone: values.phone,
        password: values.password,
      });

      setUser(user);

      try {
        const freshUser = await fetchUserProfile();
        setUser(freshUser);
      } catch {
        console.log('Could not fetch fresh user');
      }

      toast.success(
        'Реєстрація успішна! Вітаємо в Clothica!'
      );
      router.push('/');
    } catch (err: any) {
      let errorMessage = 'Помилка реєстрації';

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
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
          <Link
            href="/auth/register"
            className={`${css.tab} ${css.tabActive}`}
          >
            Реєстрація
          </Link>
          <Link href="/auth/login" className={css.tab}>
            Вхід
          </Link>
        </div>

        <div className={css.header}>
          <h1 className={css.title}>Реєстрація</h1>
        </div>

        <Formik
          initialValues={{
            firstName: '',
            phone: '',
            password: '',
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.formGroup}>
                <label
                  htmlFor="firstName"
                  className={css.label}
                >
                  Ім'я*
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Ваше ім'я"
                  className={css.input}
                  maxLength={32}
                />
                <ErrorMessage
                  name="firstName"
                  component="span"
                  className={css.errorText}
                />
              </div>

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
                  maxLength={128}
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
                {isSubmitting
                  ? 'Реєстрація...'
                  : 'Зареєструватися'}
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
