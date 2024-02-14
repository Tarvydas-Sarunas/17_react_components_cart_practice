import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { v4 as genId } from 'uuid';

const CartContext = createContext({
  cart: [],
  add(productObj) {},
  remove() {},
  update() {},
  updateUp() {},
  updateDown() {},
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
    case 'REMOVE':
      const idToRemove = action.payload;
      return cartState.filter((cObj) => cObj.cItemId !== idToRemove);
    case 'UPDATE_UP':
      console.log('cartState ===', cartState);
      console.log('update up; ===', action.payload);
      return cartState.map((cObj) => {
        if (cObj.cItemId === action.payload) {
          return {
            ...cObj,
            qty: cObj.qty + 1,
            totalPrice: (cObj.qty + 1) * cObj.price,
          };
        } else {
          return cObj;
        }
      });
    case 'UPDATE_DOWN':
      console.log('update down; ===', action.payload);
      const currentQty = cartState.find(
        (cObj) => cObj.cItemId === action.payload
      ).qty;
      if (currentQty <= 0) {
        return cartState.filter((cObj) => cObj.cItemId !== action.payload);
      }
      return cartState.map((cObj) => {
        if (cObj.cItemId === action.payload) {
          return {
            ...cObj,
            qty: cObj.qty - 1,
            totalPrice: (cObj.qty - 1) * cObj.price,
          };
        } else {
          return cObj;
        }
      });
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
    console.log('remove item in cart ===', idToRemove);
    dispach({
      type: 'REMOVE',
      payload: idToRemove,
    });
  };

  // const update = (idToUpdate, direction) => {
  //   console.log('updating cart CartProvider ===', idToUpdate);
  //   dispach({
  //     type: 'UPDATE',
  //     payload: { id: idToUpdate, direction: direction },
  //   });
  // };
  // ou
  const updateUp = (idToUpdate) => {
    console.log('updating cart CartProvider ===', idToUpdate);
    dispach({
      type: 'UPDATE_UP',
      payload: idToUpdate,
    });
  };
  const updateDown = (idToUpdate) => {
    console.log('updating cart CartProvider ===', idToUpdate);
    dispach({
      type: 'UPDATE_DOWN',
      payload: idToUpdate,
    });
  };

  const cartCtxValue = {
    cart: cartState,
    add,
    remove,
    updateUp,
    updateDown,
  };

  return (
    <CartContext.Provider value={cartCtxValue}>{children}</CartContext.Provider>
  );
}

export function useCartCtx() {
  return useContext(CartContext);
}
