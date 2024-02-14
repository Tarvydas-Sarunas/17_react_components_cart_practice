import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { v4 as genId } from 'uuid';

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
      const productItemToAddObj = action.payload;
      // tikriname ar cart yra toks objektas ant kurio paspausta
      const isInCart = cartState.some(
        (cObj) => cObj.prodId === action.payload.id
      );

      if (isInCart === true) {
        // jei toks yra padidinti quantity ir total price
        return cartState.map((cObj) => {
          if (cObj.prodId === productItemToAddObj.id) {
            // grazinti pakeista kopija
            return {
              ...cObj,
              qty: cObj.qty + 1,
              totalPrice: (cObj.qty + 1) * cObj.price,
            };
          } else {
            return cObj;
          }
        });
      } else {
        // suformuoti objekta toki kaip idejimui i kart
        const madeObj = {
          cItemId: genId(),
          prodId: productItemToAddObj.id,
          title: productItemToAddObj.title,
          qty: 1,
          price: productItemToAddObj.price,
          img: productItemToAddObj.thumbnail,
          totalPrice: productItemToAddObj.price,
        };
        console.log('madeObj ===', madeObj);
        return [...cartState, madeObj];
      }
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
    cart: cartState,
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
