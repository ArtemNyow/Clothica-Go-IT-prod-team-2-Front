'use client';
import styles from './BasketModal.module.css';
type Props = {
  text: string;
  buttonText: string;
  onClick: () => void;
};

export default function MessageNoInfo({
  text,
  buttonText,
  onClick,
}: Props) {
  return (
    <div>
      <p className={styles.messageNoInfo}>{text}</p>
      <button
        onClick={onClick}
        className={styles.messageNoInfoBtn}
      >
        {buttonText}
      </button>
    </div>
  );
}
