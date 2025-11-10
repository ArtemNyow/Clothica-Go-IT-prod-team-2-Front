import css from "./Hero.module.css";
import Image from 'next/image';

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div>
        <h1 className={css.heroTitle}>Знайди свій стиль з Clothica вже сьогодні!</h1>
        <p className={css.heroDesc}>Clothica — це місце, де комфорт поєднується зі стилем. Ми створюємо базовий одяг, який легко комбінується та підходить для будь-якої нагоди. Обирай речі, що підкреслять твою індивідуальність і завжди будуть актуальними.</p>
      <ul className={css.heroList}>
        <li className={css.heroLinkPoducts}>
          {/* id для скролу по секціям */}
          <a href="#PopularGoods">До товарів</a>
        </li>
          <li className={css.heroLinkCategories}>
          <a href="#PopularCategories">Дослідити категорії</a>
        </li>
      </ul>
      </div>
      {/* зображення для різних екранів */}
      <picture>
        <source srcSet="/hero-pc.jpg" media="(min-width: 1440px) "/>
        <source srcSet="/hero-tablet.jpg" media="(min-width: 768px) "/>
        <Image className={css.heroImg} src="/hero-mobile.jpg" alt="Clothica" width={335} height={335}/>
        </picture>
    </section>
  );
}