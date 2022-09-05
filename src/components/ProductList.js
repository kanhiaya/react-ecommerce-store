import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filtered_products, grid_view } = useFilterContext();

  // if product not found than return below error
  if (filtered_products < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no product matched your search...
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView products={filtered_products}></ListView>;
  }

  return <GridView products={filtered_products}>product list</GridView>;
};

export default ProductList;
