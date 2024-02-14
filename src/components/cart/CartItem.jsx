import React from 'react';

const cartItem = {
  cItemId: 1,
  prodId: 1,
  title: 'Iphone',
  qty: 1,
  price: 799,
  img: 'blalal.jpg',
};

export default function CartItem({ item }) {
  return (
    <div className='grid grid-cols-5 justify-center items-center text-center'>
      <img
        className='h-16 w-16 object-cover justify-self-center'
        src={item.img}
        alt={item.title}
      />
      <h3>{item.title}</h3>
      <div className='grid grid-cols-3 justify-center'>
        <button className='justify-self-end'>-</button>
        <p>{item.qty}</p>
        <button className='justify-self-start'>+</button>
      </div>
      <p>{item.price}</p>
      <p>{item.price * item.qty}</p>
    </div>
  );
}

// atvaizduoti visa musu cartObj informacija
// inputa su mygtukais + -
// inputo reiksme uzpildyti su qty
// keisti ja su + -
