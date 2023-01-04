import * as types from "../actionTypes/cartActionTypes";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART:
      const cartItem = state.cartItems.find(
        (item) =>
          item.id === action.payload.id && item.userId === action.payload.userId
      );
      if (cartItem) {
        cartItem.quantity += action.payload.quantity;
      } else {
        const addtoCart = action.payload;
        state.cartItems.push(addtoCart);
      }
      return {
        ...state.cartItems,
        cartItems: [...state.cartItems],
      };
    case types.DELETE_CART:
      return {
        ...state.cartItems,
        cartItems: state.cartItems.filter(
          (item) => item.token !== action.payload
        ),
      };
    case types.CHECKED_DELETE:
      return {
        cartItems: state.cartItems.filter(
          (item) => !action.payload.ids.includes(item.token)
        ),
      };
    case types.RESET_DATA:
      return {
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
