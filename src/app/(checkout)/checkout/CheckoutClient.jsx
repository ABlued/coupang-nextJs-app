'use client';
import React from 'react';
import styles from './Checkout.module.scss';
import Heading from '@/src/components/heading/Heading';
import CheckoutForm from '@/src/components/checkoutForm/CheckoutForm';
import Button from '@/src/components/button/Button';
function CheckoutClient() {
  const handleSubmit = (e) => {};
  return (
    <section>
      <div className={styles.checkout}>
        <Heading title="주문하기" />
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <CheckoutForm />
          </div>
          <div>
            <Button type="submit">토스를 이용해서 결제하기</Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CheckoutClient;
