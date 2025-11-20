'use client';

import { FormikProps } from 'formik';
import css from '@/app/(private routes)/profile/ProfilePage.module.css';
import { UserFormValues } from '@/types/user';

interface PersonalInfoFormProps {
  formik: FormikProps<UserFormValues>;
  showComment?: boolean;
  textBtn: string;
}

const PersonalInfoForm = ({
  formik,
  showComment,
  textBtn,
}: PersonalInfoFormProps) => {
  const getInputClass = (field: keyof UserFormValues) =>
    `${css.inputForm} ${
      formik.touched[field] && formik.errors[field]
        ? css.inputError
        : ''
    }`;

  const getTextareaClass = (field: keyof UserFormValues) =>
    `${css.inputTextArea} ${
      formik.touched[field] && formik.errors[field]
        ? css.textareaError
        : ''
    }`;

  return (
    <form
      className={css.profileInfo}
      onSubmit={formik.handleSubmit}
    >
      <h2 className={css.titleForm}>Особиста інформація</h2>

      <div className={css.containerProfileInfo}>
        <div className={css.profileInfoItems}>
          <div className={css.profileInfoItemsGroup}>
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
              className={getInputClass('firstName')}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваше імʼя"
              required
            />
            {formik.touched.firstName &&
              formik.errors.firstName && (
                <div className={css.error}>
                  {formik.errors.firstName}
                </div>
              )}
          </div>

          <div className={css.profileInfoItemsGroup}>
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
              className={getInputClass('lastName')}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваше прізвище"
              required
            />
            {formik.touched.lastName &&
              formik.errors.lastName && (
                <div className={css.error}>
                  {formik.errors.lastName}
                </div>
              )}
          </div>
        </div>

        <div className={css.profileInfoItems}>
          <div className={css.profileInfoItemsGroup}>
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
              className={`${getInputClass('phone')} ${css.inputPhone}`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="+38 (0__) ___-__-__"
              required
            />
            {formik.touched.phone &&
              formik.errors.phone && (
                <div className={css.error}>
                  {formik.errors.phone}
                </div>
              )}
          </div>
        </div>

        <div className={css.profileInfoItems}>
          <div className={css.profileInfoItemsGroup}>
            <label className={css.labelForm} htmlFor="city">
              Місто доставки*:
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className={getInputClass('city')}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваше місто"
              required
            />
            {formik.touched.city && formik.errors.city && (
              <div className={css.error}>
                {formik.errors.city}
              </div>
            )}
          </div>

          <div className={css.profileInfoItemsGroup}>
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
              className={getInputClass('postOffice')}
              value={formik.values.postOffice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="1"
              required
            />
            {formik.touched.postOffice &&
              formik.errors.postOffice && (
                <div className={css.error}>
                  {formik.errors.postOffice}
                </div>
              )}
          </div>
        </div>

        {showComment && (
          <div className={css.formRow}>
            <label htmlFor="comment">Коментар</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Введіть ваш коментар"
              value={formik.values.comment || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getTextareaClass('comment')}
            />
            {formik.touched.comment &&
              formik.errors.comment && (
                <div className={css.error}>
                  {formik.errors.comment}
                </div>
              )}
          </div>
        )}
      </div>

      <button type="submit" className={css.saveInputButton}>
        {textBtn}
      </button>
    </form>
  );
};

export default PersonalInfoForm;
