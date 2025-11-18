import styles from './MessageNoInfo.module.css';

interface MessageNoInfoProps {
  onClearFilters: () => void; 
}

export default function MessageNoInfo({ onClearFilters }: MessageNoInfoProps) {
  return (
    <div className={styles.messageWrapper}>
      <p className={styles.messageText}>
        За вашим запитом не знайдено жодних товарів,
        спробуйте змінити фільтри, або скинути їх.
      </p>
      <button className={styles.clearFiltersBtn} onClick={onClearFilters}>
        Скинути фільтри
      </button>
    </div>
  );
}
