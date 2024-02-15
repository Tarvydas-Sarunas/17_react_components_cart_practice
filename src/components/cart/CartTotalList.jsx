import React from 'react';
import Button from '../../ui/Button';
import { makePrice } from '../../helper';

export default function CartTotalList({ cart }) {
  const subtotal = cart.reduce((acc, cObj) => acc + cObj.totalPrice, 0);
  const totalQuantity = cart.reduce((acc, cObj) => acc + cObj.qty, 0);
  const taxes = subtotal * 0.21;

  return (
    <div className='grid grid-cols-4'>
      <ul className='col-start-4 col-end-4'>
        <li className='grid grid-cols-2 border'>
          <p>Subtotal: </p>
          <p>{makePrice(subtotal)}</p>
        </li>
        <li className='grid grid-cols-2 border'>
          <p>Total Quantity:</p>
          <p>{totalQuantity}</p>
        </li>
        <li className='grid grid-cols-2 border'>
          <p>Taxes 21%:</p>
          <p> {makePrice(taxes)}</p>
        </li>
        <li className='grid grid-cols-2 border font-bold text-xl'>
          <p>Grand total:</p>
          <p> {makePrice(subtotal + taxes)}</p>
        </li>
        <Button>Buy It Now</Button>
      </ul>
    </div>
  );
}
