import { useState } from 'react';
import CartItem from '../components/cart/CartItem';
import { useCartCtx } from './store/CartProvider';
import CartTotalList from '../components/cart/CartTotalList';

export default function CartPage() {
  const { updateUp, updateDown, remove, cart } = useCartCtx();
  console.log('cart ===', cart);

  const cartObj = {
    cItemId: 1,
    prodId: 1,
    title: 'Iphone',
    qty: 1,
    price: 799,
    img: 'blalal.jpg',
    totalPrice: 799,
  };

  return (
    <div className='container text-center'>
      <h1 className='mt-5 text-3xl'>Cart</h1>
      <p className='text-lg'>Buy Now and More</p>

      <button onClick={remove}>Remove</button>

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

        {cart?.length !== 0 &&
          cart.map((cObj) => (
            <li key={cObj.cItemId}>
              <CartItem
                item={cObj}
                onRemoveFromCart={remove}
                onUpdateUp={updateUp}
                onUpdateDown={updateDown}
              />
            </li>
          ))}
      </ul>
      <CartTotalList cart={cart} />
    </div>
  );
}
