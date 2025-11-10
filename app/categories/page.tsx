const Categories = () => {
  return (
    <section className={css.categoriesSection}>
      <div className={css.categories}>
        <h2 className={css.title}>Категорії</h2>
      </div>
      <div>
        <ul className={css.CategoriesList}>
          {visibleCategories.map(category => (
            <li
              key={category._id}
              className={css.CategoriesItem}
            >
              <Link
                href={`/categories/${category._id}`}
                className={css.CategoriesLink}
              >
                <div className={css.imageWrapper}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={416}
                    height={277}
                    loading="eager"
                    className={css.categoriesIMG}
                  />
                </div>
                <p className={css.categoriesText}>
                  {category.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {hasMore && (
        <button
          className={css.button}
          onClick={handleLoadMore}
        >
          Показати більше
        </button>
      )}
    </section>
  );
};

export default CategoriesList;
