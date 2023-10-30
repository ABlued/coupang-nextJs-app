'use client';
import useFetchCollection from '@/hooks/useFetchCollection';
import React from 'react';
import styles from './Product.module.scss';
function Product() {
  // const { data, isLoading } = useFetchCollection('products');
  return (
    <section className={styles.product}>
      <aside className={styles.filter}></aside>
    </section>
  );
}

export default Product;
