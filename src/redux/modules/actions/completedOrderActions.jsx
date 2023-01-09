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

const getOrder = (data) => ({
  type: types.GET_ORDER,
  payload: data,
});

const resetCompleted = () => ({
  type: types.RESET_DATA,
});

const completedCollectionRef = collection(db, "completedOrder");

export const unsubscribeOrder = (setData) =>
  onSnapshot(
    completedCollectionRef,
    (snapshot) => {
      let orderList = [];

      snapshot.docs.forEach((doc) => {
        orderList.push({ id: doc.id, ...doc.data() });
      });

      setData(orderList);
    },
    (err) => {
      console.log(err);
    }
  );

// export const unsubscribeOrder = (setData) => {
//   return function (dispatch) {
//     onSnapshot(
//       completedCollectionRef,
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);

//         dispatch(getOrder(list));
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   };
// };

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
