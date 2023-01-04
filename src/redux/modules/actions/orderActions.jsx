import * as types from "../actionTypes/orderActionTypes";

const addOrder = (data) => ({
  type: types.ADD_ORDER,
  payload: data,
});

const deleteOrder = (id) => ({
  type: types.DELETE_ORDER,
  payload: id,
});

const resetOrders = () => ({
  type: types.RESET_DATA,
});

export const addOrderInitiate = (data) => {
  return async function (dispatch) {
    dispatch(addOrder(data));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteOrderInitiate = (id) => {
  return async function (dispatch) {
    dispatch(deleteOrder(id));
  };
};

// Firebase Database에 있는 데이터 삭제
export const resetOrderInitiate = () => {
  return async function (dispatch) {
    dispatch(resetOrders());
  };
};
