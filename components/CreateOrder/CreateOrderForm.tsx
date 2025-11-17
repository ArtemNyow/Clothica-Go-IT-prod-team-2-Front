'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import styles from '@/app/orders/createOrder.module.css';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/lib/api/clientApi';
import { useBasketStore } from '@/lib/store/basketStore';

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  npBranch: '',
  comment: '',
};

const OrderSchema = Yup.object({
  firstName: Yup.string()
    .min(2)
    .max(30)
    .required("Обов'язкове поле"),
  lastName: Yup.string()
    .min(2)
    .max(30)
    .required("Обов'язкове поле"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Формат: +380XXXXXXXXX')
    .required("Обов'язкове поле"),
  city: Yup.string().required("Обов'язкове поле"),
  npBranch: Yup.string().required("Обов'язкове поле"),
  comment: Yup.string().max(300),
});

const CreateOrderForm = () => {
  const router = useRouter();

  const items = useBasketStore(state => state.items);
  const clearBasket = useBasketStore(
    state => state.clearBasket
  );

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      clearBasket();
      //  Вивести повідомлення про те що все гуд
    },
  });

  const handleSubmit = async (
    values: typeof initialValues
  ) => {
    const payload = {
      ...values,
      items,
      total: items.reduce(
        (sum, item) =>
          sum + item.price.value * item.quantity,
        0
      ),
    };

    mutation.mutate(payload);
  };

  return (
    <div className={styles.orderForm}>
      <h2 className={styles.formTitle}>
        Особиста інформація
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={OrderSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.formRow}>
              <label htmlFor="firstName">Імʼя*</label>
              <Field
                id="firstName"
                name="firstName"
                placeholder="Ваше імʼя"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="lastName">Прізвище*</label>
              <Field
                id="lastName"
                name="lastName"
                placeholder="Ваше прізвище"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="phone">Номер телефону*</label>
              <Field
                id="phone"
                name="phone"
                placeholder="+38 (0__)__-_-_"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="city">Місто доставки*</label>
              <Field
                id="city"
                name="city"
                placeholder="Ваше місто"
              />
              <ErrorMessage
                name="city"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="npBranch">
                Номер відділення Нової Пошти*
              </label>
              <Field
                id="npBranch"
                name="npBranch"
                placeholder="1"
              />
              <ErrorMessage
                name="npBranch"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="comment">Коментар</label>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                placeholder="Введіть ваш коментар"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Оформити замовлення
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateOrderForm;
