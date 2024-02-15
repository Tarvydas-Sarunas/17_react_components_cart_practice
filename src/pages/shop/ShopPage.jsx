import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { localProductsUrl } from '../../config';
import ShopListItem from '../../components/shop/ShopListItem';
import { useCartCtx } from '../store/CartProvider';
import Button from '../../ui/Button';

const url = 'https://dummyjson.com/products';

export default function ShopPage() {
  const [productArr, setProductArr] = useState([]);
  const [catFilterValue, setCatFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [limit, setLimit] = useState(10);

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
    getApiData(`${url}?limit=${limit}&skip=0`);
  }, [limit]);

  const getApiData = (url) => {
    axios
      // kai noriu skipinti ir limitinti per puslapi korteliu
      .get(url)
      // .get(localProductsUrl)
      .then((resp) => {
        const products = resp.data.products;
        console.log('products ===', products);
        setProductArr(products);
      })
      // .then((resp) => {
      //   const products = resp.data;
      //   console.log('products ===', products);
      //   setProductArr(products);
      // })
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

  const loadMoreHandler = () => {
    setLimit(20);
  };
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
      <Button onClick={() => setLimit(20)}>20</Button>
      <Button onClick={() => setLimit(30)}>30</Button>
      <Button onClick={() => setLimit(40)}>40</Button>
      <Button onClick={() => setLimit(50)}>50</Button>
      <div className='flex gap-2'>
        <button>Prev</button>1 2 3 4<button>Next</button>
      </div>
    </div>
  );
}
