import * as types from "../actionTypes/cartActionTypes";
import { db } from "../../../firebase";
import { setDoc, deleteDoc, doc } from "firebase/firestore";

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

const resetCart = () => ({
  type: types.RESET_DATA,
});

// setDoc을 이용해서 데이터의 id값을 doc의 id값으로 대체한다.
export const addCartInitiate = (data, id, userId) => {
  return async function (dispatch) {
    setDoc(doc(db, "cartList", userId, "cartItem", id), { data });

    dispatch(addCart(data));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteCartInitiate = (token, userId) => {
  return async function (dispatch) {
    await deleteDoc(doc(db, "cartList", userId, "cartItem", token));
    dispatch(deleteCart(token));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteCheckedItems = (ids, userId) => {
  return async function (dispatch) {
    ids.forEach(async (token) => {
      await deleteDoc(doc(db, "cartList", userId, "cartItem", token));
    });
    dispatch(checkedDelete({ ids }));
  };
};

// 데이터 리셋
export const resetCartInitiate = () => {
  return async function (dispatch) {
    dispatch(resetCart());
  };
};
