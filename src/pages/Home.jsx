import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';


const Home = () => {
      const [items, setItems] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [categoryId, setCategoryId] = useState(0);
      const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
      });

      useEffect(() => {
        setIsLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://63395945937ea77bfdc99bb3.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
          .then((res) => res.json())
          .then((arr) => {
            setItems(arr);
            setIsLoading(false);
          });
          window.scrollTo(0, 0);
      }, [categoryId, sortType]);


  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
          : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </div>
  );
}

export default Home;
