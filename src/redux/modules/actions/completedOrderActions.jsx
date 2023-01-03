import * as types from "../actionTypes/completedOrderAction";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

const addCompletedOrder = (data) => ({
  type: types.COMPLETED_ORDER,
  payload: data,
});

const deleteCompletedOrder = () => ({
  type: types.DELETE_COMPLETED_ORDER,
});

export const completedOrderInitiate = (data) => {
  return async function (dispatch) {
    await addDoc(collection(db, "completedOrder"), { data });

    dispatch(addCompletedOrder(data));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteCompletedInitiate = () => {
  return async function (dispatch) {
    dispatch(deleteCompletedOrder());
  };
};
