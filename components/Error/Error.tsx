'use client';

import styles from './Error.module.css';

export default function Error({
  message = 'Щось пішло не так...',
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h2 className={styles.title}>Помилка</h2>
        <p className={styles.text}>{message}</p>

        <a href="/" className={styles.button}>
          На головну
        </a>
      </div>
    </div>
  );
}
