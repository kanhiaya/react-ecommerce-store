import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  // set the filter and product layout
  if (action.type === LOAD_PRODUCTS) {
    // when prduct load lets set filter range max price.
    let maxPrice = action.payload.map((priceItem) => priceItem.price);
    maxPrice = Math.max(...maxPrice);
    // check the highest price

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  // sort products when change value
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProduct = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProduct = tempProduct.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProduct = tempProduct.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProduct = tempProduct.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      tempProduct = tempProduct.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return { ...state, filtered_products: tempProduct };
  }
  //end sort when value chnage

  // update filter state
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  // set filter for product query
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    //check filter values
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products]; //fresh set of data

    // filtering for text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    //for category
    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    //for company
    if (company !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }
    //for colors - colors in array so we have to set callback aerrow
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((clr) => clr === color);
      });
    }
    //price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      });
    }

    return { ...state, filtered_products: tempProducts };
  }
  //  clear the filters
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
