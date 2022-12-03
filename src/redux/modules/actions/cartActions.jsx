import * as types from "../actionTypes/cartActionTypes";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

const addCart = (data) => ({
  type: types.ADD_CART,
  payload: data,
});

const cartCollectionRef = collection(db, "cart");

// Firebase Database에 있는 데이터 추가
export const addCartInitiate = (data) => {
  return async function (dispatch) {
    await addDoc(cartCollectionRef, data);
    dispatch(addCart(data));
  };
};
