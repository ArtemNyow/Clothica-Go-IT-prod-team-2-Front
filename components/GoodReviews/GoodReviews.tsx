import css from './GoodReviews.module.css';

export default function GoodReviews() {
  return (
    <div className={css.container}>
      <div className={css.containerSend}>
        <h2 className={css.title}>Відгуки клієнтів</h2>
        <button
          className={`${css.btnSend} ${css.btnFeedback}`}
          type="button"
        >
          Залишити відгук
        </button>
      </div>
      <div className={css.containerBtnSend}>
        <p className={css.notFeedback}>
          У цього товару ще немає відгуків
        </p>
        <button
          className={`${css.btnSend} ${css.btnFeedback}`}
          type="button"
        >
          Залишити відгук
        </button>
      </div>
    </div>
  );
}
