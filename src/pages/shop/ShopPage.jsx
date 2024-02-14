import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { localProductsUrl, productsUrl } from '../../config';
import { json } from 'react-router-dom';
import ShopListItem from '../../components/shop/ShopListItem';
import { v4 as genId } from 'uuid';
import CartItem from '../../components/cart/CartItem';

export default function ShopPage() {
  const [productArr, setProductArr] = useState([]);
  const [cartArr, setCartArr] = useState([]);

  const cartObj = {
    cItemId: 1,
    prodId: 1,
    title: 'Iphone',
    qty: 1,
    price: 799,
    img: 'blalal.jpg',
  };

  const addToCart = (itemId) => {
    // surasti item is prodArr kurio id yra === itemId
    const foundItem = productArr.find((pObj) => pObj.id === itemId);
    console.log('foundItem ===', foundItem);

    // suformuoti objekta toki kaip idejimui i kart
    const madeObj = {
      cItemId: genId(),
      prodId: foundItem.id,
      title: foundItem.title,
      qty: 1,
      price: foundItem.price,
      img: foundItem.thumbnail,
    };
    console.log('madeObj ===', madeObj);
    // ideti objekta i cartArr (simple)
    setCartArr([...cartArr, madeObj]);

    // jei jau yra toks objektas carte - padidinti qty
  };

  const updateQtyCart = () => {
    // tures atnaujinti skaiciu qty kazkuriam objekte
  };

  const removeFromCart = () => {
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

      {cartArr.length !== 0 && (
        <ul className='my-10'>
          <li className='mb-10'>
            <div className='grid grid-cols-5 text-center'>
              <p>Image</p>
              <p>Article title</p>
              <p>Quantity</p>
              <p>Price</p>
              <p>TotalPrice</p>
            </div>
          </li>

          {cartArr.map((cObj) => (
            <li key={cObj.cItemId}>
              <CartItem item={cObj} />
            </li>
          ))}
        </ul>
      )}

      <ul className='grid grid-cols-3 gap-1'>
        {productArr.map((pObj) => (
          <li key={pObj.id}>
            <ShopListItem item={pObj} onAddToCard={addToCart} />
          </li>
        ))}
      </ul>
    </div>
  );
}
