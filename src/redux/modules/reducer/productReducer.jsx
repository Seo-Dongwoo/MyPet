import * as types from "../actionTypes/productActionTypes";

const initialState = {
  loading: false,
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_PRODUCT:
      return {
        products: [...state.products, action.payload],
      };
    case types.DELETE_PRODUCT:
      return {
        ...state.products,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
