import * as types from "../actionTypes/orderActionTypes";

const initialState = {
  orderItems: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ORDER:
      const Order = action.payload;

      state.orderItems.push({ Order });
      return {
        ...state.orderItems,
        orderItems: [...state.orderItems],
      };
    case types.DELETE_ORDER:
      return {
        orderItems: [],
      };
    default:
      return state;
  }
};

export default orderReducer;
