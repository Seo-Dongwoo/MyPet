import * as types from "../actionTypes/productActionTypes";

const initialState = {
  loading: false,
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
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
    case types.EDIT_PRODUCT:
      const updateProduct = action.payload;
      const updateProducts = state.products.map((product) => {
        if (product.id === updateProduct.id) {
          return updateProduct;
        }
      });
      return {
        products: updateProducts,
      };
    default:
      return state;
  }
};

export default productReducer;
