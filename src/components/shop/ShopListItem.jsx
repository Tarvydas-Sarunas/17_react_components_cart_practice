import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

export default function ShopListItem({ item }) {
  return (
    <div className='border shadow-md'>
      <Link
        className='flex items-center justify-center mt-5 '
        to={`/shop/${item.id}`}
      >
        <img
          className='block h-56 w-full object-cover'
          src={item.thumbnail}
          alt={item.title}
        />
      </Link>
      <div className='text-bold text-slate-700 m-3'>
        <h3 className='text-2xl'>{item.title}</h3>
        <p className='text-gray-400 my-3 font-semibold'>{item.price} €</p>
        <p>
          Category: <span className='font-semibold'>{item.category}</span>
        </p>
        {/* eina SingleItemPage  */}
        <div className='flex gap-2 my-5 place-items-start'>
          <Link className=' inline-block' to={`/shop/${item.id}`}>
            <Button>Read More</Button>
          </Link>
          <Button outline>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
