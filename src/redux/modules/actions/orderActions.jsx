import * as types from "../actionTypes/orderActionTypes";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

const addOrder = (data) => ({
  type: types.ADD_ORDER,
  payload: data,
});

export const deleteOrder = () => ({
  type: types.DELETE_ORDER,
});

export const addOrderInitiate = (data) => {
  return async function (dispatch) {
    await addDoc(collection(db, "orders"), { data });

    dispatch(addOrder(data));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteOrderInitiate = () => {
  return async function (dispatch) {
    dispatch(deleteOrder());
  };
};
