'use client';

import { useAuthStore } from '@/lib/store/authStore';
import {
  logout as apiLogout,
  fetchUserProfile,
  updateUserProfile,
  fetchMyOrders,
} from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './ProfilePage.module.css';
import Loading from '@/app/loading';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { Order } from '@/types/order';

export const userSchema = Yup.object({
  firstName: Yup.string().required("Ім'я обов'язкове"),
  lastName: Yup.string(),
  phone: Yup.number()
    .typeError('Номер телефону має бути числом')
    .required("Телефон обов'язковий"),
  email: Yup.string().email('Некоректний email'),
  city: Yup.string(),
  postOffice: Yup.string(),
});

const defaultUserValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  postOffice: '',
};
interface Prop {
  isComment: boolean;
}

const ProfilePage = () => {
  const router = useRouter();
  const { user, setUser, clearAuth } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ['myOrders'],
    queryFn: fetchMyOrders,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...defaultUserValues,
      ...(user || {}),
      phone: user?.phone?.toString() || '',
      postOffice: user?.postOffice?.toString() || '',
    },
    validationSchema: userSchema,
    onSubmit: async values => {
      try {
        const payload: Partial<User> = {
          ...values,
          phone: Number(values.phone),
          postOffice: values.postOffice
            ? String(values.postOffice)
            : undefined,
        };
        const updatedUser =
          await updateUserProfile(payload);
        setUser(updatedUser);
        toast.success('Профіль оновлено');
        router.push('/profile');
      } catch (err) {
        console.error(err);
        setError('Failed to update profile');
      }
    },
  });

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {}
    clearAuth();
    toast.success('Ви вийшли з системи');
    router.push('/');
  };

  if (isLoading) return <Loading />;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.cabinetContainer}>
          <h1 className={css.titleProfilePage}>Кабінет</h1>
          <div className={css.containerCabinetWithoutTitle}>
            <section
              className={css.containerPageProfileFirst}
            >
              <form
                className={css.profileInfo}
                onSubmit={formik.handleSubmit}
              >
                <h2 className={css.titleForm}>
                  Особиста інформація
                </h2>
                <div className={css.containerProfileInfo}>
                  <div className={css.profileInfoItems}>
                    <div
                      className={css.profileInfoItemsGroup}
                    >
                      <label
                        className={css.labelForm}
                        htmlFor="firstName"
                      >
                        Ім'я*:
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className={css.inputForm}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Ваше імʼя"
                        required
                      />
                      {formik.touched.firstName &&
                        formik.errors.firstName && (
                          <div
                            className={
                              css.textMessageNoInfo
                            }
                          >
                            {formik.errors.firstName}
                          </div>
                        )}
                    </div>
                    <div
                      className={css.profileInfoItemsGroup}
                    >
                      <label
                        className={css.labelForm}
                        htmlFor="lastName"
                      >
                        Прізвище*:
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className={css.inputForm}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Ваше прізвище"
                        required
                      />
                      {formik.touched.lastName &&
                        formik.errors.lastName && (
                          <div
                            className={
                              css.textMessageNoInfo
                            }
                          >
                            {formik.errors.lastName}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className={css.profileInfoItems}>
                    <div
                      className={css.profileInfoItemsGroup}
                    >
                      <label
                        className={css.labelForm}
                        htmlFor="phone"
                      >
                        Номер*:
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={`${css.inputForm} ${css.inputPhone}`}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="+38 (0__) ___-__-__"
                        required
                      />
                      {formik.touched.phone &&
                        formik.errors.phone && (
                          <div
                            className={
                              css.textMessageNoInfo
                            }
                          >
                            {formik.errors.phone}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className={css.profileInfoItems}>
                    <div
                      className={css.profileInfoItemsGroup}
                    >
                      <label
                        className={css.labelForm}
                        htmlFor="city"
                      >
                        Місто доставки*:
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        className={css.inputForm}
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Ваше місто"
                        required
                      />
                    </div>
                    <div
                      className={css.profileInfoItemsGroup}
                    >
                      <label
                        className={css.labelForm}
                        htmlFor="postOffice"
                      >
                        Номер відділення Нової Пошти*:
                      </label>
                      <input
                        id="postOffice"
                        name="postOffice"
                        type="text"
                        className={css.inputForm}
                        value={formik.values.postOffice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="1"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={css.saveInputButton}
                >
                  Зберегти зміни
                </button>
              </form>
            </section>

            {/* --- Мої замовлення --- */}
            <section
              className={css.containerPageProfileSecond}
            >
              <h2 className={css.titleForm}>
                Мої замовлення
              </h2>
              <div
                className={
                  css.containerMessageTransactionList
                }
              >
                {orders.length === 0 ? (
                  <div className={css.messageNoInfo}>
                    <p className={css.textMessageNoInfo}>
                      У вас ще не було жодних замовлень!
                      Мерщій до покупок!
                    </p>
                    <button
                      onClick={() => router.push('/goods')}
                      className={css.linkMessageNoInfo}
                    >
                      До покупок
                    </button>
                  </div>
                ) : (
                  <ul className={css.transactionList}>
                    {orders.map(order => (
                      <li
                        key={order._id}
                        className={css.transactionItem}
                      >
                        <div className={css.orderWrap}>
                          <p
                            className={
                              css.transactionItemTextUnStrong
                            }
                          >
                            {new Date(
                              order.createdAt!
                            ).toLocaleDateString()}
                          </p>
                          <span
                            className={
                              css.transactionItemSpanStrong
                            }
                          >
                            {order.orderNumber}
                          </span>
                        </div>
                        <div className={css.orderWrap}>
                          <p
                            className={
                              css.transactionItemText
                            }
                          >
                            Сума
                          </p>
                          <span
                            className={
                              css.transactionItemSpan
                            }
                          >
                            {order.totals.total} грн.
                          </span>
                        </div>
                        <div className={css.orderWrap}>
                          <p
                            className={
                              css.transactionItemText
                            }
                          >
                            Статус
                          </p>
                          <span
                            className={
                              css.transactionItemSpan
                            }
                          >
                            {order.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className={css.logoutButton}
          >
            Вийти з кабінету
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
