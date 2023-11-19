import React from 'react';
import styles from './CartClient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '@/src/redux/slice/cartSlice';
import { useRouter } from 'next/router';
import { selectIsLoggedIn } from '@/src/redux/slice/authSlice';
import { useEffect } from 'react';
function CartClient() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {};

  const removeFromCart = (cart) => {};

  const clearCart = () => {};

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(''));
  });

  return <div>CartClient</div>;
}

export default CartClient;
