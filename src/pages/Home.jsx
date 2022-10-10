import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort, { menuList} from '../components/Sort';

import { SearchContext } from '../App';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {categoryId, sort, currentPage} = useSelector(state => state.filter);  
  const sortType = sort.sortProperty;
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const fetchPizzas = () => {
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios
          .get(
            `https://63395945937ea77bfdc99bb3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
          )
          .then((res) => {
            setItems(res.data);
            setIsLoading(false);
          });

        window.scrollTo(0, 0);
  }

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
      fetchPizzas();
    }

    isSearch.current = false;

  }, [categoryId, sortType, searchValue, currentPage]);



  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);
  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? sceletons : pizzas}
      </div>
      <Pagination onChangePage={onChangePage} currentPage={currentPage}/>
    </div>
  );
};

export default Home;
