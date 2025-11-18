'use client';

import { createReview } from '@/lib/api/clientApi';
import { ReviewRequestBody } from '@/types/review';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { StarRating } from 'react-flexible-star-rating';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import css from './ReviewModal.module.css';

interface ModalProps {
  onClose: () => void;
  goodId: string;
}

interface FormValues {
  name: string;
  review: string;
  rating: number;
}

const initValues: FormValues = {
  name: '',
  review: '',
  rating: 0,
};

export const ReviewSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Ім'я має містити принаймні 3 символи")
    .required(`Введіть Ваше ім'я`),
  review: Yup.string()
    .min(5, 'Відгук має містити принаймні 5 символів')
    .max(500, 'Відгук не повинен перевищувати 500 символів')
    .required(`Введіть Ваш відгук`),
  rating: Yup.number()
    .min(1, 'Вкажіть оцінку від 1 до 5')
    .max(5, 'Вкажіть оцінку від 1 до 5')
    .required('Вкажіть оцінку'),
});

export default function ReviewModal({
  onClose,
  goodId,
}: ModalProps) {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: createMutation } = useMutation({
    mutationFn: createReview,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['reviews', goodId],
      });
      toast.success('Ваш відгук відправлено!');
      onClose();
    },
    onError() {
      toast.error('Щось пішло не так, спробуйте ще раз');
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const payload: ReviewRequestBody = {
      goodId,
      author: values.name,
      rate: values.rating,
      description: values.review,
    };

    setLoading(true);

    try {
      await createReview(payload);
      toast.success('Ваш відгук відправлено!');
      queryClient.invalidateQueries({
        queryKey: ['reviews', goodId],
      });
      onClose();
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Щось пішло не так';

      toast.error(message);
      console.error(
        'Failed to create feedback:',
        err.response?.data || err
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackdrop = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth -
      document.documentElement.clientWidth;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener(
        'keydown',
        handleKeydown
      );
    };
  }, [onClose]);

  return (
    <>
      {createPortal(
        <div
          onMouseDown={handleBackdrop}
          className={css.backdrop}
          role="dialog"
          aria-modal="true"
        >
          <div className={css.container}>
            <button
              onClick={onClose}
              type="button"
              className={css.closeBtn}
            >
              <svg
                height={14}
                width={14}
                className={css.closeIcon}
              >
                <use href={`/sprite.svg#icon-close`}></use>
              </svg>
            </button>
            <h2 className={css.title}>Залишити відгук</h2>
            <Formik
              initialValues={initValues}
              onSubmit={handleSubmit}
              validationSchema={ReviewSchema}
            >
              {formik => (
                <Form className={css.form}>
                  <div className={css.inputContainer}>
                    <label
                      className={css.label}
                      htmlFor="name"
                    >
                      Ваше імʼя
                    </label>
                    <Field
                      className={css.input}
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Ваше ім'я"
                    />
                    <div className={css.errorMessage}>
                      <ErrorMessage
                        name="name"
                        component="span"
                      />
                    </div>
                  </div>

                  <div className={css.inputContainer}>
                    <label
                      className={css.label}
                      htmlFor="review"
                    >
                      Відгук
                    </label>
                    <Field
                      as="textarea"
                      className={css.textarea}
                      id="review"
                      type="text"
                      name="review"
                      placeholder="Ваш відгук"
                    ></Field>
                    <div className={css.errorMessage}>
                      <ErrorMessage
                        name="review"
                        component="span"
                      />
                    </div>
                  </div>

                  <div className={css.ratingContainer}>
                    <Field
                      name="rating"
                      as={StarRating}
                      isHalfRatingEnabled
                      color={'#000000'}
                      dimension={6}
                      onRatingChange={(value: number) => {
                        formik.setFieldValue(
                          'rating',
                          value
                        );
                      }}
                      initialRating={0}
                    ></Field>
                    <div className={css.errorMessage}>
                      <ErrorMessage
                        name="rating"
                        component="span"
                      />
                    </div>
                  </div>

                  <button
                    className={css.button}
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? 'Надсилаємо відгук...'
                      : 'Надіслати'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
