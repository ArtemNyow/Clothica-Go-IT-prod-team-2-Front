import css from './NoGoodReviews.module.css';

interface Props {
  onOpenModal?: () => void;
}

export default function NoGoodReviews({
  onOpenModal,
}: Props) {
  return (
    <div className={css.container}>
      <div className={css.containerSend}>
        <h2 className={css.title}>Відгуки клієнтів</h2>
      </div>
      <div className={css.containerBtnSend}>
        <p className={css.notFeedback}>
          У цього товару ще немає відгуків
        </p>
        <button
          className={`${css.btnSend} ${css.btnFeedback}`}
          type="button"
          onClick={onOpenModal}
        >
          Залишити відгук
        </button>
      </div>
    </div>
  );
}
