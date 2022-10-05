import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';


const Home = () => {
      const [items, setItems] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        fetch('https://63395945937ea77bfdc99bb3.mockapi.io/items')
          .then((res) => res.json())
          .then((arr) => {
            setItems(arr);
            setIsLoading(false);
          });
          window.scrollTo(0, 0);
      }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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
