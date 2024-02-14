import React from 'react';
import Button from '../../ui/Button';

export default function CartTotalList({ cart }) {
  const subtotal = cart.reduce((acc, cObj) => acc + cObj.totalPrice, 0);
  const totalQuantity = cart.reduce((acc, cObj) => acc + cObj.qty, 0);
  const taxes = subtotal * 0.21;

  console.log('subtotal ===', subtotal);
  return (
    <div className='grid grid-cols-4'>
      <ul className='col-start-4 col-end-4'>
        <li className='grid grid-cols-2 border'>
          <p>Subtotal: </p>
          <p>{subtotal} €</p>
        </li>
        <li className='grid grid-cols-2 border'>
          <p>Total Quantity:</p>
          <p>{totalQuantity}</p>
        </li>
        <li className='grid grid-cols-2 border'>
          <p>Taxes 21%:</p>
          <p> {taxes} €</p>
        </li>
        <li className='grid grid-cols-2 border'>
          <p>Coupon code: </p>
          <p>€</p>
        </li>
        <li className='grid grid-cols-2 border font-bold'>
          <p>Grand total:</p>
          <p> {subtotal + taxes} €</p>
        </li>
        <Button>Buy Now</Button>
      </ul>
    </div>
  );
}
