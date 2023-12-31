'use client';
import React, { useEffect } from 'react';
import styles from './OrderHistory.module.scss';
import useFetchCollection from '@/src/hooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_ORDERS, selectOrderHistory } from '@/src/redux/slice/orderSlice';
import { selectUserId } from '@/src/redux/slice/authSlice';
import Heading from '@/src/components/heading/Heading';
import Loader from '@/src/components/loader/Loader';
import { formatTime } from '@/src/utils/dayjs';
import { priceFormat } from '@/src/utils/priceFormat';
import { useRouter } from 'next/navigation';
function OrderHistoryClient() {
  const { data, isLoading } = useFetchCollection('orders');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, []);

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserId);
  const filteredOrders = orders.filter((order) => order.userID === userID);
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/order-details/${id}`);
  };

  return (
    <section className={styles.order}>
      <Heading title="주문 목록">
        {isLoading && <Loader />}
        <div className={styles.table}>
          {!filteredOrders.length ? (
            <p>주문 목록이 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>주문 날짜</th>
                  <th>주문 아이디</th>
                  <th>주문 금액</th>
                  <th>주문 상태</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;
                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>{formatTime(orderDate)}</td>
                      <td>{id}</td>
                      <td>{priceFormat(orderAmount)}원</td>
                      <td>
                        <p
                          className={
                            orderStatus !== '배송완료'
                              ? `${styles.pending}`
                              : `${styles.delivered}`
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Heading>
    </section>
  );
}

export default OrderHistoryClient;
