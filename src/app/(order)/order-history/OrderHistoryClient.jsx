'use client';
import React, { useEffect } from 'react';
import styles from './OrderHistory.module.scss';
import useFetchCollection from '@/src/hooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_ORDERS, selectOrderHistory } from '@/src/redux/slice/orderSlice';
import { selectUserId } from '@/src/redux/slice/authSlice';
function OrderHistoryClient() {
  const { data, isLoading } = useFetchCollection('orders');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, []);

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserId);
  return <div>OrderHistoryClient</div>;
}

export default OrderHistoryClient;
