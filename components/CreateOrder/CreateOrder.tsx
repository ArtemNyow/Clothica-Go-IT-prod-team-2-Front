'use client';

import { useBasketStore } from '@/lib/store/basketStore';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import GoodsOrderList from '../BasketModal/GoodsOrderList';
import MessageNoInfo from '../BasketModal/MessageNoInfo';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';
import { createOrder } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { UserFormValues } from '@/types/user';
import styles from '@/app/orders/createOrder.module.css';

export const userSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я повинно містити максимум 50 символів")
    .required("Ім'я обов'язкове"),

  lastName: Yup.string()
    .min(2, 'Прізвище повинно містити мінімум 2 символи')
    .max(
      50,
      'Прізвище повинно містити максимум 50 символів'
    )
    .required("Прізвище обов'язкове"),

  phone: Yup.string()
    .matches(
      /^\+?3?8?(0\d{9})$/,
      'Некоректний номер телефону'
    )
    .required("Телефон обов'язковий"),

  city: Yup.string()
    .min(2, 'Місто повинно містити мінімум 2 символи')
    .max(100, 'Місто повинно містити максимум 100 символів')
    .required("Місто обов'язкове"),

  postOffice: Yup.string()
    .min(1, 'Поштове відділення не може бути пустим')
    .max(200, 'Поштове відділення занадто довге')
    .required("Поштове відділення обов'язкове"),

  comment: Yup.string()
    .max(500, 'Коментар не може перевищувати 500 символів')
    .optional(),
});

const CreateOrder = () => {
  const items = useBasketStore(state => state.items);
  const clearBasket = useBasketStore(
    state => state.clearBasket
  );
  const router = useRouter();
  const { user } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (payload: any) => createOrder(payload),
    onSuccess: () => {
      toast.success('Замовлення створено успішно');
      clearBasket();
      if (user) router.push('/profile');
      router.push('/');
    },
    onError: () => {
      toast.error('Помилка при створенні замовлення');
    },
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
      comment: '',
    },
    validationSchema: userSchema,
    onSubmit: values => {
      if (items.length === 0) {
        toast.error('Ваш кошик порожній');
        return;
      }

      const payload = {
        items: items.map(item => ({
          goodId: item._id,
          qty: item.quantity,
          price: item.price.value,
          ...(item.size ? { size: item.size } : {}),
        })),
        shippingInfo: {
          firstName: formik.values.firstName,
          lastName: formik.values.lastName || '',
          phone: formik.values.phone.toString(),
          city: formik.values.city || '',
          postOffice: formik.values.postOffice || '',
          comment: formik.values.comment || '',
        },
      };

      mutation.mutate(payload);
    },
  });

  return (
    <section className={styles.orderPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>
          Оформити замовлення
        </h1>
        <div className={styles.sectionsWrapper}>
          {items.length > 0 ? (
            <>
              <div className={styles.modalContent}>
                <GoodsOrderList
                  items={items}
                  title="Товари"
                />
              </div>
              <PersonalInfoForm
                formik={formik}
                showComment={true}
                textBtn="Оформити замовлення"
              />
            </>
          ) : (
            <div className={styles.empty}>
              <MessageNoInfo
                text="Ваш кошик порожній, мерщій до покупок!"
                buttonText="До покупок"
                onClick={() => router.push('/goods')}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateOrder;
