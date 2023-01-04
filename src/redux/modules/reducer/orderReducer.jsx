import * as types from "../actionTypes/orderActionTypes";

const initialState = {
  orderItems: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDERS:
      return {
        ...state,
        orderItems: action.payload,
      };
    case types.ADD_ORDER:
      const orderItem = action.payload;

      state.orderItems.push(orderItem);
      return {
        orderItems: [...state.orderItems],
      };
    case types.DELETE_ORDER:
      return {
        orderItems: state.orderItems.filter(
          (item) => !action.payload.includes(item.orderPathId)
        ),
      };
    case types.RESET_DATA:
      return {
        orderItems: [],
      };
    default:
      return state;
  }
};

export default orderReducer;
