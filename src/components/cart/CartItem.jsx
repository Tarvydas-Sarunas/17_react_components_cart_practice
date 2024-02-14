import React from 'react';

const cartItem = {
  cItemId: 1,
  prodId: 1,
  title: 'Iphone',
  qty: 1,
  price: 799,
  img: 'blalal.jpg',
};

export default function CartItem({
  item,
  onRemoveFromCart,
  onUpdateUp,
  onUpdateDown,
}) {
  return (
    <div className='grid grid-cols-5 justify-center items-center text-center border mb-2 py-1 pl-1'>
      <img
        className='h-16 w-16 object-cover justify-self-center'
        src={item.img}
        alt={item.title}
      />
      <div>
        <h3 className='text-md'>{item.title}</h3>
        <button
          className='underline mt-3 text-gray-400'
          onClick={() => onRemoveFromCart(item.cItemId)}
        >
          Remove
        </button>
      </div>

      <div className='grid grid-cols-3 justify-center'>
        <button
          onClick={() => onUpdateDown(item.cItemId)}
          className='justify-self-end border hover:bg-indigo-50 border-indigo-500 rounded-sm w-8 h-8 leading-none text-2xl'
        >
          -
        </button>
        <p className='w-8 text-center text-xl font-semibold justify-self-center'>
          {item.qty}
        </p>
        <button
          onClick={() => onUpdateUp(item.cItemId)}
          className='justify-self-start border hover:bg-indigo-50 border-indigo-500 rounded-sm w-8 h-8 leading-none text-2xl'
        >
          +
        </button>
      </div>
      <p>{item.price}</p>
      <p>{item.totalPrice}</p>
    </div>
  );
}

// atvaizduoti visa musu cartObj informacija
// inputa su mygtukais + -
// inputo reiksme uzpildyti su qty
// keisti ja su + -
