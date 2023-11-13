'use client';
import useFetchDocument from '@/hooks/useFetchDocument';
import { useParams } from 'next/navigation';
import React from 'react';
import styles from './ProductDetails.module.scss';
import Loader from '@/components/loader/Loader';
const ProductDetailsClient = () => {
  const { id } = useParams();
  const { document: product } = useFetchDocument('product', id);

  const addToCart = () => {};

  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  const tomorrowDate = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();
  return (
    <section className={styles.product}>
      {product === null ? <Loader /> : <></>}
    </section>
  );
};

export default ProductDetailsClient;
