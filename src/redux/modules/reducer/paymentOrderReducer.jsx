import * as types from "../actionTypes/paymentActionTypes";

const initialState = {
  paymentOrderItems: [],
};

const paymentOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PAYMENT_ORDER:
      const paymentItem = action.payload;

      state.paymentOrderItems.push(paymentItem);
      return {
        ...state.paymentOrderItems,
        paymentOrderItems: [...state.paymentOrderItems],
      };
    case types.DELETE_PAYMENT_ORDER:
      return {
        paymentOrderItems: [],
      };
    default:
      return state;
  }
};

export default paymentOrderReducer;
