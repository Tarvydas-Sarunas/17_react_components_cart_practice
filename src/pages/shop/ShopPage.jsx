import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { localProductsUrl, productsUrl } from '../../config';
import { json } from 'react-router-dom';
import ShopListItem from '../../components/shop/ShopListItem';

export default function ShopPage() {
  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = () => {
    axios
      .get(localProductsUrl)
      .then((resp) => {
        const products = resp.data;
        setProductArr(products);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  };

  return (
    <div className='container'>
      <h1 className='mt-5 text-3xl text-center'>SHOP</h1>
      <p className='text-lg my-4 text-center'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
        nostrum.
      </p>

      <ul className='grid grid-cols-3 gap-1'>
        {productArr.map((pObj) => (
          <li key={pObj.id}>
            <ShopListItem item={pObj} onAddToCard={() => {} /*addToCart*/} />
          </li>
        ))}
      </ul>
    </div>
  );
}
