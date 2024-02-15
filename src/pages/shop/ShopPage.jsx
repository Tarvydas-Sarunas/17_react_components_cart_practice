import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { localProductsUrl } from '../../config';
import ShopListItem from '../../components/shop/ShopListItem';
import { useCartCtx } from '../store/CartProvider';

export default function ShopPage() {
  const [productArr, setProductArr] = useState([]);

  const cartCtx = useCartCtx();
  console.log('cartCtx ===', cartCtx);

  const allCategories = [];

  productArr.forEach((pObj) => {
    if (allCategories.includes(pObj.category)) {
      return;
    }
    allCategories.push(pObj.category);
  });
  console.log('allCategories ===', allCategories);

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

      <fieldset>
        <select name='' id=''>
          <option value='smartphone'>Smartphone</option>
        </select>
      </fieldset>

      <ul className='grid grid-cols-3 gap-1'>
        {productArr.map((pObj) => (
          <li key={pObj.id}>
            <ShopListItem item={pObj} onAddToCard={() => cartCtx.add(pObj)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
