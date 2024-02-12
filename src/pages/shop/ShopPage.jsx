import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { localProductsUrl, productsUrl } from '../../config';
import { json } from 'react-router-dom';
import ShopListItem from '../../components/shop/ShopListItem';

export default function ShopPage() {
  const [productArr, setProductArr] = useState([]);
  const [cartArr, setCartArr] = useState([]);

  const cartObj = {
    cItemId: 1,
    prodId: 1,
    title: 'Iphone',
    qty: 1,
    price: 799,
  };

  const addToCard = () => {
    // ideti objekta i cartArr (simple)
    // jei jau yra toks objektas carte - padidinti qty
  };

  const updateQtyCard = () => {
    // tures atnaujinti skaiciu qty kazkuriam objekte
  };

  const removeFromCard = () => {
    // pasalinti obj is cardArr masyvo
  };

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = () => {
    axios
      .get(localProductsUrl)
      .then((resp) => {
        const products = resp.data;
        console.log('products ===', products);
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

      <ul>
        {cartArr.map((cObj) => (
          <li key={cObj.cId}>Cart item</li>
        ))}
      </ul>

      <ul className='grid grid-cols-3 gap-1'>
        {productArr.map((pObj) => (
          <li key={pObj.id}>
            <ShopListItem item={pObj} />
          </li>
        ))}
      </ul>
    </div>
  );
}
