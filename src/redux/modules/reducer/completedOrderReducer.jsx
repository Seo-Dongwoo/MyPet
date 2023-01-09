import * as types from "../actionTypes/completedOrderAction";

const initialState = {
  completedOrders: [],
};

const completedOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDER:
      return {
        ...state,
        completedOrders: action.payload,
      };
    case types.COMPLETED_ORDER:
      const completedOrder = action.payload;

      state.completedOrders.push(completedOrder);
      return {
        completedOrders: [...state.completedOrders],
      };

    case types.DELETE_COMPLETED_ORDER:
      return {
        completedOrders: state.completedOrders.filter(
          (item) => item.orderNumber !== action.payload
        ),
      };
    case types.RESET_DATA:
      return {
        completedOrders: [],
      };
    default:
      return state;
  }
};

export default completedOrderReducer;
