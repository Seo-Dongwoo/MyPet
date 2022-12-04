import * as types from "../actionTypes/cartActionTypes";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART:
      return {
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
