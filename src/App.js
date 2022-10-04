import { useState, useEffect } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sceleton from './components/PizzaBlock/Sceleton';
import Sort from './components/Sort';

import './scss/app.scss';


function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://63395945937ea77bfdc99bb3.mockapi.io/items')
    .then(res => res.json())
    .then(arr => {
      setItems(arr)
      setIsLoading(false);
    })
  }, []);



  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(6)].map((_, index) => <Sceleton key={index}/>)
                : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
