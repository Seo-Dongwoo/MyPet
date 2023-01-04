import * as types from "../actionTypes/completedOrderAction";
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

const addCompletedOrder = (data) => ({
  type: types.COMPLETED_ORDER,
  payload: data,
});

const deleteCompletedOrder = (id) => ({
  type: types.DELETE_COMPLETED_ORDER,
  payload: id,
});

const resetCompleted = () => ({
  type: types.RESET_DATA,
});

const completedCollectionRef = collection(db, "completedOrder");

export const unsubscribe = (setData) =>
  onSnapshot(
    completedCollectionRef,
    (snapshot) => {
      let completedOrderList = [];

      snapshot.docs.forEach((doc) => {
        completedOrderList.push({ id: doc.id, ...doc.data() });
      });

      setData(completedOrderList);
    },
    (err) => {
      console.log(err);
    }
  );

export const completedOrderInitiate = (data) => {
  return async function (dispatch) {
    await addDoc(collection(db, "completedOrder"), { data });

    dispatch(addCompletedOrder(data));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteInitiate = (id, orderNumber) => {
  return async function (dispatch) {
    await deleteDoc(doc(completedCollectionRef, id));
    dispatch(deleteCompletedOrder(orderNumber));
  };
};

// 데이터 리셋
export const resetCompletedInitiate = () => {
  return async function (dispatch) {
    dispatch(resetCompleted());
  };
};
