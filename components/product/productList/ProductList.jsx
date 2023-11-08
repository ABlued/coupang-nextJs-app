import {
  SORT_PRODUCTS,
  selectFilteredProducts,
} from '@/redux/slice/filterSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function ProductList() {
  const [sort, setSort] = useState('latest');
  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ product, sort }));
  }, [dispatch, sort, product]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const isRadioSelected = (value) => sort === value;
  const handleRadioClick = (e) => {
    setSort(e.target.value);
  };

  return <div>productList</div>;
}

export default ProductList;
