import styles from './NotFound.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>
          Сторінку не знайдено
        </h2>
        <p className={styles.text}>
          Схоже, що цієї сторінки не існує або вона була
          переміщена.
        </p>

        <a href="/" className={styles.button}>
          На головну
        </a>
      </div>
    </div>
  );
}
