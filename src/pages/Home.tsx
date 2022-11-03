import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort, { menuList} from '../components/Sort';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {categoryId, sort, currentPage, searchValue } = useSelector(selectFilter); 
  const {items, status } = useSelector(selectPizzaData); 

  const sortType = sort.sortProperty;
  const isSearch = useRef(false);
  const isMounted = useRef(false); 

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async () => {

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(        
        fetchPizzas({
          order,
          sortBy,
          category,
          search,
          currentPage: String(currentPage),
        }),
      );   

    window.scrollTo(0, 0);
  };

  //Если изменили параметры и был первый рендер
    useEffect(() => {
      if (isMounted.current) {
        const queryString = qs.stringify({
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
        });
        navigate(`?${queryString}`);
      }
      isMounted.current = true;
      getPizzas();
    }, [categoryId, sortType, currentPage]);


//Если был первые рендер то проверяем URL и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = menuList.find(obj => obj.sortProperty === params.sortProperty);
      
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер то делаем запрос на сервер
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;

  }, []);



  const pizzas = items.map((obj: any) => (    
      <PizzaBlock {...obj} />    
  ));
  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error' ? <div>Произошла ошибка</div> : 
          <div className="content__items">
            {status === 'loading' ? sceletons : pizzas}
          </div>
        }
      <Pagination onChangePage={onChangePage} currentPage={currentPage}/>
    </div>
  );
};

export default Home;
