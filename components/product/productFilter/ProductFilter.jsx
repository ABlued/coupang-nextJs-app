import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from '@/redux/slice/productSlice';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProductFilter() {
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [price, setPrice] = useState('10000');

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ];

  const filterCategories = (category) => {
    setCategory(category);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const allBrands = [
    'All',
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY({ products, price, category, brand }));
  }, [dispatch, products, price, category, brand]);

  const clearFilters = () => {
    setCategory('All');
    setBrand('All');
    setPrice(maxPrice);
  };

  return <div>ProductFilter</div>;
}

export default ProductFilter;
