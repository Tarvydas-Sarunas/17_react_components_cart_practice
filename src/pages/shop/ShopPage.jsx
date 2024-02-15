import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { localProductsUrl } from '../../config';
import ShopListItem from '../../components/shop/ShopListItem';
import { useCartCtx } from '../store/CartProvider';

export default function ShopPage() {
  const [productArr, setProductArr] = useState([]);
  const [catFilterValue, setCatFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

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

  // variantas 2 su Set geras

  const categoriesWithSet = new Set();
  productArr.forEach((pObj) => categoriesWithSet.add(pObj.category));

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

  // jei turim catFilterValue tai mapinam per prafiltruota prodArr
  const filtered = catFilterValue
    ? productArr.filter((pObj) => pObj.category === catFilterValue)
    : productArr;
  // jei catFilterValue '' tai per prodArr

  const arrAfterSearch = searchValue
    ? filtered.filter((pObj) =>
        pObj.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : filtered;

  return (
    <div className='container'>
      <h1 className='mt-5 text-3xl text-center'>SHOP</h1>
      <p className='text-lg my-4 text-center'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
        nostrum.
      </p>

      <fieldset className='grid grid-cols-3 mb-5'>
        <label>
          <span>Select by category</span>
          <select
            name=''
            id=''
            onChange={(e) => setCatFilterValue(e.target.value)}
            className='block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value={''}>All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Search by title</span>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type='search'
            className='block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </label>
      </fieldset>

      <ul className='grid grid-cols-3 gap-1'>
        {arrAfterSearch.map((pObj) => (
          <li key={pObj.id}>
            <ShopListItem item={pObj} onAddToCard={() => cartCtx.add(pObj)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
