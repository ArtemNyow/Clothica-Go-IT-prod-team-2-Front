'use client';

import styles from './GoodsLoader.module.css';

export default function GoodsLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}
