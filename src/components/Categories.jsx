
const Categories = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              onClick={() => onChangeCategory(index)}
              className={value === index ? 'active' : ''}
              key={index}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
