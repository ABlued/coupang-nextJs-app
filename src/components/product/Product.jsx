'use client';
import useFetchCollection from '@/src/hooks/useFetchCollection';
import React from 'react';
import styles from './Product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../loader/Loader';
import ProductList from './productList/productList';
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
} from '@/src/redux/slice/productSlice';
import ProductFilter from './productFilter/ProductFilter';
function Product() {
  const { data, isLoading } = useFetchCollection('products');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
    dispatch(GET_PRICE_RANGE({ products: data }));
  }, [data, dispatch]);
  const products = useSelector((state) => state.products);

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList />}
      </div>
    </section>
  );
}

export default Product;
