import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const CartContext = createContext({
  cart: [],
  add(productObj) {},
  remove() {},
  update() {},
});

// persivadinu savo contexta
CartContext.displayName = 'MaCart';

const cartReducer = (cartState, action) => {
  switch (action.type) {
    case 'ADD':
      console.log('add to cart in reducer ===', action.payload);
      return cartState;

    default:
      console.warn('no action found', action);
      return cartState;
  }
};

export default function CartProvider({ children }) {
  const [cartState, dispach] = useReducer(cartReducer, []);

  const add = (productObj) => {
    console.log('adding to cart ===', productObj);
    dispach({
      type: 'ADD',
      payload: productObj,
    });
  };

  const remove = (idToRemove) => {
    console.log('remove item in cart ===');
  };

  const cartCtxValue = {
    add,
    remove,
  };

  return (
    <CartContext.Provider value={cartCtxValue}>{children}</CartContext.Provider>
  );
}

export function useCartCtx() {
  return useContext(CartContext);
}
