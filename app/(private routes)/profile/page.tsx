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
import { User, UserFormValues } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { Order } from '@/types/order';
import PersonalInfoForm from '@/components/PersonalInfoForm/PersonalInfoForm';

export const userSchema = Yup.object({
  firstName: Yup.string().required("Ім'я обов'язкове"),
  lastName: Yup.string(),
  phone: Yup.string()
    .matches(
      /^\+?3?8?(0\d{9})$/,
      'Некоректний номер телефону'
    )
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

  const formik = useFormik<UserFormValues>({
    enableReinitialize: true,
    initialValues: {
      _id: user?._id,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone?.toString() || '',
      email: user?.email || '',
      city: user?.city || '',
      postOffice: user?.postOffice || '',
    },
    validationSchema: userSchema,
    onSubmit: async values => {
      const payload: Partial<User> = {
        ...values,
        phone: Number(values.phone),
      };
      const updatedUser = await updateUserProfile(payload);
      setUser(updatedUser);
      toast.success('Профіль оновлено');
      router.push('/profile');
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
            <PersonalInfoForm
              formik={formik}
              showComment={false}
              textBtn="Зберегти зміни"
            />
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
