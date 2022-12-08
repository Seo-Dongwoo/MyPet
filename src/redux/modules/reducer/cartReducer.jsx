import * as types from "../actionTypes/cartActionTypes";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART:
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) {
        cartItem.quantity += action.payload.quantity;
      } else {
        const addtoCart = {
          id: action.payload.id,
          img: action.payload.img,
          product: action.payload.product,
          price: action.payload.price,
          quantity: action.payload.quantity,
          desc: action.payload.desc,
          category: action.payload.category,
        };
        state.cartItems.push(addtoCart);
      }
      return {
        ...state.cartItems,
        cartItems: [...state.cartItems],
      };
    case types.DELETE_CART:
      return {
        ...state.cartItems,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case types.CHECKED_DELETE:
      return {
        cartItems: state.cartItems.filter(
          (item) => !action.payload.ids.includes(item.id)
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
