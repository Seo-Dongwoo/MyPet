import * as types from "../actionTypes/paymentActionTypes";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

const addPayment = (data) => ({
  type: types.ADD_PAYMENT_ORDER,
  payload: data,
});

export const deletePayment = () => ({
  type: types.DELETE_PAYMENT_ORDER,
});

export const addPaymentInitiate = (data) => {
  return async function (dispatch) {
    await addDoc(collection(db, "paymentOrder"), { data });

    dispatch(addPayment(data));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deletePaymentInitiate = () => {
  return async function (dispatch) {
    dispatch(deletePayment());
  };
};
