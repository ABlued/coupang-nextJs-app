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
  },
});

export const { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
