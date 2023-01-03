import * as types from "../actionTypes/completedOrderAction";

const initialState = {
  completedOrders: [],
};

const completedOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.COMPLETED_ORDER:
      const completedOrder = action.payload;

      state.completedOrders.push(completedOrder);
      return {
        ...state.completedOrders,
        completedOrders: [...state.completedOrders],
      };
    case types.DELETE_COMPLETED_ORDER:
      return {
        completedOrders: [],
      };
    default:
      return state;
  }
};

export default completedOrderReducer;
