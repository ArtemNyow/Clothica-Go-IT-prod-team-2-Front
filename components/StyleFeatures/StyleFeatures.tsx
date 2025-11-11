import styles from './StyleFeatures.module.css';
 
export default function Style() {
  return (
    <section className={styles.style}>
      <div className={styles.container}>
        <h2 className={styles.title}>Обери свій унікальний стиль сьогодні</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={`${styles.icon} ${styles.iconNatural}`}></div>
            <h3 className={styles.cardTitle}>Якість та натуральність</h3>
            <p className={styles.description}>
              тільки приємні до тіла тканини, які зберігають форму навіть після
              десятків прань.
            </p>
          </li>
          <li className={styles.item}>
            <div className={`${styles.icon} ${styles.iconUniversal}`}></div>
            <h3 className={styles.cardTitle}>Універсальний дизайн</h3>
            <p className={styles.description}>
              базові кольори та лаконічний стиль, що легко комбінуються між
              собою.
            </p>
          </li>
          <li className={styles.item}>
            <div className={`${styles.icon} ${styles.iconComfort}`}></div>
            <h3 className={styles.cardTitle}>Комфорт на кожен день</h3>
            <p className={styles.description}>
              одяг, який не обмежує рухів і підходить для будь-якої ситуації.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
