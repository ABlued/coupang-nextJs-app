const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_CATEGORY: (state, action) => {
      const { products, category } = action.payload;
      let tempProduct = [];
      if (category === 'All') {
        tempProduct = products;
      } else {
        tempProduct = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProduct;
    },
    FILTER_BY_BRAND: (state, action) => {
      const { products, brand } = action.payload;
      let tempProduct = [];
      if (brand === 'All') {
        tempProduct = products;
      } else {
        tempProduct = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = tempProduct;
    },
    FILTER_BY_PRICE: (state, action) => {
      const { products, price } = action.payload;
      let tempProduct = [];
      tempProduct = products.filter((product) => product.price <= price);
      state.filteredProducts = tempProduct;
    },
    SORT_PRODUCTS: (state, action) => {
      const { products, sort } = action.payload;
      let tempProduct = [];
      if (sort === 'latest') {
        tempProduct = products;
        if (sort === 'lowest-price') {
          tempProduct = products.slice().sort((a, b) => a.price - b.price);
        } else if (sort === 'highest-price') {
          tempProduct = products.slice().sort((a, b) => b.price - a.price);
        }

        state.filteredProducts = tempProduct;
      }
    },
  },
});

export const {
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  SORT_PRODUCTS,
} = filterSlice.actions;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export default filterSlice.reducer;
