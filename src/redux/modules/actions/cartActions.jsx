import * as types from "../actionTypes/cartActionTypes";
import { db } from "../../../firebase";
import { collection, setDoc, deleteDoc, doc } from "firebase/firestore";

const addCart = (data) => ({
  type: types.ADD_CART,
  payload: data,
});

const deleteCart = (id) => ({
  type: types.DELETE_CART,
  payload: id,
});

const checkedDelete = (ids) => ({
  type: types.CHECKED_DELETE,
  payload: ids,
});

const cartCollectionRef = collection(db, "cart");

// setDoc을 이용해서 데이터의 id값을 doc의 id값으로 대체한다.
export const addCartInitiate = (data, id) => {
  return async function (dispatch) {
    setDoc(doc(db, "cart", id), { data });

    dispatch(addCart(data));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteCartInitiate = (id) => {
  return async function (dispatch) {
    await deleteDoc(doc(cartCollectionRef, id));
    dispatch(deleteCart(id));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteCheckedItems = (ids) => {
  return async function (dispatch) {
    ids.forEach(async (id) => {
      await deleteDoc(doc(cartCollectionRef, id));
    });
    dispatch(checkedDelete({ ids }));
  };
};
