import * as types from "../actionTypes/productActionTypes";

const initialState = {
  loading: false,
  products: [],
  product: {},
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
      const deleteId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== deleteId
      );
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
