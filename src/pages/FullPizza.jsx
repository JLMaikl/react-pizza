import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ pizza, setPizza ] = useState();

    useEffect(() => {

        const fetchPizza = async () => {
            try {
                const { data } = await axios.get(
                  'https://63395945937ea77bfdc99bb3.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Error');
                navigate('/');
            }
        }

        fetchPizza();

    }, []);


    if (!pizza) {
        return (          
            <h1>Загрузка...</h1>
        )
    }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <h2>{ pizza.title }</h2>      
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}

export default FullPizza;
