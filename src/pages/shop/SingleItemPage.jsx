import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../ui/Button';
import { useCartCtx } from '../store/CartProvider';
import { PiShoppingCartThin } from 'react-icons/pi';

export default function SingleItemPage() {
  const [singleItemObj, setSingleItemObj] = useState({});
  const [expandedImage, setExpandedImage] = useState(null);

  const { add } = useCartCtx();
  console.log('cartCtx ===', add);

  const { itemId } = useParams();
  console.log('itemId ===', itemId);

  useEffect(() => {
    getApiData();
  }, [itemId]);

  const getApiData = () => {
    axios
      .get(`https://dummyjson.com/products/${itemId}`)
      .then((resp) => {
        const products = resp.data;
        setSingleItemObj(products);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  };

  function handleThumbnailClick(imageUrl) {
    setExpandedImage(imageUrl);
  }

  return (
    <div className='container mt-10'>
      {/* {isLoading && <h2>Loading...</h2>} */}
      <div className='grid grid-cols-2 gap-8'>
        <div className='left'>
          <img
            src={expandedImage || singleItemObj.thumbnail}
            alt={singleItemObj.title}
          />
          <ul className='grid grid-cols-3 gap-2'>
            {singleItemObj.images?.map((imgUrl) => (
              <li
                key={imgUrl}
                className='cursor-pointer hover:scale-105 transition duration-500 cursor-pointer'
                onClick={() => handleThumbnailClick(imgUrl)}
              >
                <img src={imgUrl} alt={imgUrl} />
              </li>
            ))}
          </ul>
        </div>
        <div className='right'>
          <h1 className='text-3xl mb-5'>{singleItemObj.title}</h1>
          <p>Brand: {singleItemObj.brand}</p>
          <p>Category: {singleItemObj.category}</p>
          <p>Description: {singleItemObj.description}</p>
          <p>Rating: {singleItemObj.rating}</p>
          <p>Price: {singleItemObj.price} €</p>
          <div className='flex items-center mt-4'>
            <input
              className='border w-16 h-11 rounded-l-md border-slate-600 text-xl'
              type='number'
              defaultValue={1}
            />
            <Button
              onClick={() => add(singleItemObj)}
              className='rounded-l-none flex justify-center gap-1 mt-0'
            >
              Add To <PiShoppingCartThin size={'25px'} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
