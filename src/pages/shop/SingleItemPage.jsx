import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../ui/Button';
import { localProductsUrl } from '../../config';

export default function SingleItemPage() {
  const [singleItemObj, setSingleItemObj] = useState({});
  const [expandedImage, setExpandedImage] = useState(null);

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
          <input
            className='border w-16 h-11 rounded-l-md border-slate-600 text-xl'
            type='number'
            defaultValue={1}
          />
          <Button className='rounded-l-none'>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
