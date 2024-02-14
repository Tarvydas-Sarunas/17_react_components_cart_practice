import React from 'react';
import { useState } from 'react';
import { v4 as genId } from 'uuid';
import CartItem from '../components/cart/CartItem';
import { useCartCtx } from './store/CartProvider';

export default function CartPage() {
  const [cartArr, setCartArr] = useState([]);
  console.table(cartArr);

  const cartCtx = useCartCtx();

  const cartObj = {
    cItemId: 1,
    prodId: 1,
    title: 'Iphone',
    qty: 1,
    price: 799,
    img: 'blalal.jpg',
    totalPrice: 799,
  };

  const addToCart = (itemId) => {
    // surasti item is prodArr kurio id yra === itemId
    const foundItem = productArr.find((pObj) => pObj.id === itemId);
    console.log('foundItem ===', foundItem);

    // ideti objekta i cartArr (simple)
    // setCartArr([...cartArr, madeObj]);

    // jei jau yra toks objektas carte - padidinti qty
    const isInCart = cartArr.some((cObj) => cObj.prodId === itemId);

    if (isInCart === true) {
      // jei toks yra padidinti quantity ir total price
      setCartArr(
        cartArr.map((cObj) => {
          if (cObj.prodId === itemId) {
            // grazinti pakeista kopija
            return {
              ...cObj,
              qty: cObj.qty + 1,
              totalPrice: (cObj.qty + 1) * cObj.price,
            };
          } else {
            return cObj;
          }
        })
      );
    } else {
      // suformuoti objekta toki kaip idejimui i kart
      const madeObj = {
        cItemId: genId(),
        prodId: foundItem.id,
        title: foundItem.title,
        qty: 1,
        price: foundItem.price,
        img: foundItem.thumbnail,
        totalPrice: foundItem.price,
      };
      console.log('madeObj ===', madeObj);
      setCartArr([...cartArr, madeObj]);
    }
  };

  const updateQtyCart = () => {
    // tures atnaujinti skaiciu qty kazkuriam objekte
  };

  const removeFromCart = (itemIdToRemove) => {
    // pasalinti obj is cardArr masyvo
    console.log('itemIdToRemove ===', itemIdToRemove);

    const removeItem = cartArr.filter(
      (cObj) => cObj.cItemId !== itemIdToRemove
    );
    console.log('removeItem ===', removeItem);
    setCartArr(removeItem);

    // kaip atnaujinti geriau sitaip net jei yra kazkas asinchroninio jis veiks

    // setCartArr((prevState) =>
    //   prevState.filter((cObj) => cObj.cItemId !== itemIdToRemove)
    // );
  };

  return (
    <div className='container text-center'>
      <h1 className='mt-5 text-3xl'>Cart</h1>
      <p className='text-lg'>Buy Now and More</p>

      <button onClick={cartCtx.remove}>Remove</button>

      {cartArr.length !== 0 && (
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

          {cartArr.map((cObj) => (
            <li key={cObj.cItemId}>
              <CartItem item={cObj} onRemoveFromCart={removeFromCart} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
