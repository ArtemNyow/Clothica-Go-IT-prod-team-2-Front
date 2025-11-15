"use client"

import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import toast from 'react-hot-toast';
import css from './ProfilePage.module.css';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [city, setCity] = useState<string>();
  const [post, setPost] = useState<number>();
  const [comment, setComment] = useState<string>();

  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {}
    clearAuth();
    toast.success('Ви вийшли з системи');
    router.push('/');
  };

  if (!user) {
    return (
      <div className={css.loading}>
        <p>Завантаження профілю...</p>
      </div>
    );
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.cabinetContainer}>
          <h1 className={css.titleProfilePage}>Кабінет</h1>
          <div className={css.containerCabinetWithoutTitle}>
      <section className={css.containerPageProfileFirst}>
        <form className={css.profileInfo}>
            <h2 className={css.titleForm}>Особиста інформація</h2>
            <div className={css.containerProfileInfo}>
              <div className={css.profileInfoItems}>
                <div className={css.profileInfoItemsGroup}>
              <label className={css.labelForm} htmlFor="firstName">Ім'я*:</label>
              <input
              id="firstName"
              type="text"
              className={css.inputForm}
                  value={firstName}
                  placeholder='Ваше імʼя'
                required
                  />
                </div>
                <div className={css.profileInfoItemsGroup}>
              <label className={css.labelForm} htmlFor="lastName">Прізвище*:</label>
              <input
              id="lastName"
              type="text"
              className={css.inputForm}
                  value={lastName}
                  placeholder='Ваше прізвище'
                required
                  />
                  </div>
              </div>
              <div className={css.profileInfoItems}>
                <div className={css.profileInfoItemsGroup}>
              <label className={css.labelForm} htmlFor="phone">Номер*:</label>
                    <input
                      id="phone"
                      type="tel"
                      className={`${css.inputForm} ${css.inputPhone}`}
                  value={phone}
                  placeholder='+38 (0__) ___-__-__'
                required
                  />
                  </div>
              </div>
              <div className={css.profileInfoItems}>
                <div className={css.profileInfoItemsGroup}>
              <label className={css.labelForm} htmlFor="city">Місто доставки*:</label>
              <input
              id="city"
              type="text"
              className={css.inputForm}
                  value={city}
                  placeholder='Ваше місто'
                required
                  />
                </div>
                <div className={css.profileInfoItemsGroup}>
              <label className={css.labelForm} htmlFor="post">Номер відділення Нової Пошти*:</label>
              <input
              id="post"
              type="number"
              className={css.inputForm}
                  value={post}
                  placeholder='1'
                required
                />
                </div>
                </div>
                <label className={`${css.labelForm} ${css.labelTextArea}`} htmlFor="comment">Коментар:</label>
              <textarea
              id="comment"
              className={css.inputTextArea}
                value={comment}
                placeholder='Введіть ваш коментар'
              required
              />
            </div>
            <button type="submit" className={css.saveInputButton}>
              Зберегти зміни
            </button>
        </form>
      </section>
        <section className={css.containerPageProfileSecond}>
          <h2 className={css.titleForm}>Мої замовлення</h2>
          <div className={css.containerMessageTransactionList}>
        {false ? (<div className={css.messageNoInfo}>
          <p className={css.textMessageNoInfo}>У вас ще не було жодних замовлень! Мерщій до покупок!</p>
          <button onClick={() => router.push('/goods')} className={css.linkMessageNoInfo}>До покупок</button>
        </div>) : (<ul className={css.transactionList}>
              <li className={css.transactionItem}>
                <p className={css.transactionItemTextUnStrong}>29.08.2025</p>
                <span className={css.transactionItemSpanStrong}>№1235960</span>
              </li>
              <li className={css.transactionItem}>
                <p className={css.transactionItemText}>Сума</p>
                <span className={css.transactionItemSpan}>1499 грн.</span>
                </li>
              <li className={`${css.transactionItem} ${css.transactionItemLi}`}>
                <p className={css.transactionItemText}>Статус</p>
                <span className={css.transactionItemSpan}>У процесі</span>
              </li>
            </ul>)}
            </div>
            </section>
          </div>
          <button type="button" onClick={handleLogout}
          className={css.logoutButton}>Вийти з кабінету</button>
        </div>
        </div>
      </main>
  );
};

export default ProfilePage;