import * as types from "../actionTypes/orderActionTypes";
import { db } from "../../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const addOrder = (data) => ({
  type: types.ADD_ORDER,
  payload: data,
});

export const deleteOrder = () => ({
  type: types.DELETE_ORDER,
});

const getOrders = (data) => ({
  type: types.GET_ORDERS,
  payload: data,
});

const orderCollectionRef = collection(db, "orders");

export const unsubscribe = (setData) => {
  return function (dispatch) {
    onSnapshot(
      orderCollectionRef,
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);

        dispatch(getOrders(list));
      },
      (err) => {
        console.log(err);
      }
    );
  };
};

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
