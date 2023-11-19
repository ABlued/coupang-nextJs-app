const { createSlice } = require('@reduxjs/toolkit');
const { toast } = require('react-toastify');

const initialState = {
  cartItems:
    typeof window !== 'undefined' && localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const increaseCount = action.payload.quantity ?? 1;
      if (productIndex >= 0) {
        state.cartItems[productIndex].quantity += increaseCount;
        toast.success(`${action.payload.name} 상품이 하나 추가되었습니다.`);
      } else {
        const tempProduct = {
          ...action.payload,
          cartTotalQuantity: increaseCount,
        };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} 상품이 추가되었습니다..`);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL_QUANTITY: (state) => {
      state.cartTotalQuantity = state.cartItems.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );
    },
    CALCULATE_SUBTOTAL: (state) => {
      const array = [];

      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
    },
    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex] > 1) {
        state.cartItems[productIndex].quantity -= 1;
        toast.info(`${action.payload.name} 개수 -1`);
      } else if (state.cartItems[productIndex] === 1) {
        const newItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newItem;
        toast.info(
          `${action.payload.name} 상품이 장바구니에서 삭제되었습니다.`
        );
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, action) => {
      const newItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newItem;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.success(
        `${action.payload.name} 상품이 장바구니에서 삭제되었습니다.`
      );
    },
    CLEAR_CART: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.success('장바구니가 비워졌습니다.');
    },
  },
});

export const {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUBTOTAL,
  SAVE_URL,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
