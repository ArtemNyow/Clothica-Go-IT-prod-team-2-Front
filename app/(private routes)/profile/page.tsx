"use client"

import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import {fetchUserProfile, updateUserProfile, fetchMyOrders} from '@/lib/api/clientApi'
import toast from 'react-hot-toast';
import css from './ProfilePage.module.css';
import Loading from "@/app/loading";
import { User } from '@/types/user'
import { Order } from '@/types/order';

const ProfilePage = () => {
  const { user, setUser, clearAuth } = useAuthStore();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>();
  const [post, setPost] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setPhone(user.phone !== undefined ? String(user.phone) : "");
        setCity(user.city || "");
        setPost(user.postOffice !== undefined ? Number(user.postOffice) : "");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const currentUser = await fetchUserProfile();
        setFirstName(currentUser?.firstName || "");
        setLastName(currentUser?.lastName || "");
        setPhone(currentUser.phone !== undefined ? String(currentUser.phone) : "");
        setCity(currentUser?.city || "");
        setPost(currentUser.postOffice !== undefined ? Number(currentUser.postOffice) : "")
        setUser(currentUser);

        const userOrders = await fetchMyOrders();
        setOrders(userOrders);

      } catch (err) {
        console.error(err);
        setError("Unable to load profile");
      } finally {
        setLoading(false);
      }
    } fetchProfile();
  }, [user, setUser]);

  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload: Partial<User> = {
    firstName,
    lastName,
    phone: Number(phone),
    city,
    postOffice: post !== "" ? String(post) : undefined,
  };

  try {
    const updatedUser = await updateUserProfile(payload);
    setUser(updatedUser);
    router.push("/profile");
  } catch (err) {
    console.error(err);
    setError("Failed to update profile");
  }
};

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {}
    clearAuth();
    toast.success('Ви вийшли з системи');
    router.push('/');
  };

  if (loading) return <Loading />;

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
                        onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                      onChange={(e) => setPhone(e.target.value)}
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
                        onChange={(e) => setCity(e.target.value)}
                  placeholder='Ваше місто'
                required
                  />
                </div>
                <div className={css.profileInfoItemsGroup}>
              <label className={css.labelForm} htmlFor="post">Номер відділення Нової Пошти*:</label>
              <input
              id="post"
              type="string"
                        className={css.inputForm}
                        value={post}
                      onChange={(e) => setPost(e.target.value ? Number(e.target.value) : "")}
                  placeholder='1'
                required
                />
                </div>
                </div>
            </div>
            <button type="submit" className={css.saveInputButton} onClick={handleSave}>
              Зберегти зміни
            </button>
        </form>
      </section>
        <section className={css.containerPageProfileSecond}>
          <h2 className={css.titleForm}>Мої замовлення</h2>
              <div className={css.containerMessageTransactionList}>
                
        {/* {false ? (<div className={css.messageNoInfo}>
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
            </ul>)} */}
                
                {orders.length === 0 ? (
                <div className={css.messageNoInfo}>
                  <p className={css.textMessageNoInfo}>
                    У вас ще не було жодних замовлень! Мерщій до покупок!
                  </p>
                  <button onClick={() => router.push('/goods')} className={css.linkMessageNoInfo}>
                    До покупок
                  </button>
                </div>
              ) : (
                <ul className={css.transactionList}>
                  {orders.map(order => (
                    <li key={order._id} className={css.transactionItem}>
                      <p className={css.transactionItemTextUnStrong}>
                        {new Date(order.createdAt!).toLocaleDateString()}
                      </p>
                      <span className={css.transactionItemSpanStrong}>{order.orderNumber}</span>
                      <p className={css.transactionItemText}>Сума</p>
                      <span className={css.transactionItemSpan}>{order.totals.total} грн.</span>
                      <p className={css.transactionItemText}>Статус</p>
                      <span className={css.transactionItemSpan}>{order.status}</span>
                    </li>
                  ))}
                </ul>
              )}
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