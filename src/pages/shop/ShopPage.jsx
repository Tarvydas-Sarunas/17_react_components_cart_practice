import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { localProductsUrl } from '../../config';
import ShopListItem from '../../components/shop/ShopListItem';
import { useCartCtx } from '../store/CartProvider';

export default function ShopPage() {
  const [productArr, setProductArr] = useState([]);
  const [filterSelect, setFilterSelect] = useState([]);

  const cartCtx = useCartCtx();

  // ===========
  // paimu tik viena kategorija is daugumos kurios visos kartojasi
  const allCategories = [];

  productArr.forEach((pObj) => {
    if (allCategories.includes(pObj.category)) {
      return;
    }
    allCategories.push(pObj.category);
  });
  console.log('allCategories ===', allCategories);

  // variantas 2 su Set geras

  const categoriesWithSet = new Set();
  productArr.forEach((pObj) => categoriesWithSet.add(pObj.category));
  console.log('categoriesWithSet ===', categoriesWithSet);
  // ===========

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

  function handleFilter(e) {
    const filteredValue = productArr.filter(
      (pObj) => pObj.category === e.target.value
    );
    setFilterSelect(filteredValue);
  }

  const filtered = filterSelect.length > 0 ? filterSelect : productArr;

  return (
    <div className='container'>
      <h1 className='mt-5 text-3xl text-center'>SHOP</h1>
      <p className='text-lg my-4 text-center'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
        nostrum.
      </p>

      <fieldset className='grid grid-cols-3 mb-5'>
        <select
          name=''
          id=''
          onChange={handleFilter}
          className='block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        >
          <option value={''}>All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </fieldset>

      <ul className='grid grid-cols-3 gap-1'>
        {filtered.map((pObj) => (
          <li key={pObj.id}>
            <ShopListItem item={pObj} onAddToCard={() => cartCtx.add(pObj)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
