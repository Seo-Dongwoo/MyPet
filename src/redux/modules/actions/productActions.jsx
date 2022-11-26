import * as types from "../actionTypes/productActionTypes";
import { db, storage } from "../../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const setLoading = (products) => ({
  type: types.SET_LOADING,
  payload: products,
});

const addProducts = (data) => ({
  type: types.ADD_PRODUCT,
  payload: data,
});

export const deleteProducts = (id) => ({
  type: types.DELETE_PRODUCT,
  payload: id,
});

const editProducts = (data) => ({
  type: types.EDIT_PRODUCT,
  payload: data,
});

const getProducts = (data) => ({
  type: types.GET_PRODUCTS,
  payload: data,
});

const productCollectionRef = collection(db, "products");

export const unsubscribe = (setData) => {
  return function (dispatch) {
    onSnapshot(
      productCollectionRef,
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setLoading(false);
        dispatch(getProducts(list));
      },
      (err) => {
        console.log(err);
      }
    );
  };
};

// Firebase Database에 있는 데이터 추가
export const addInitiate = (data) => {
  setLoading();
  return async function (dispatch) {
    await addDoc(productCollectionRef, data);
    dispatch(addProducts(data));
  };
};

// Storage에 image파일 저장하기
export const uploadFiles = (file, setProgress, setData, name) => {
  const uploadRef = ref(storage, `images/${name}`);
  const uploadTask = uploadBytesResumable(uploadRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const uploadProgress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(uploadProgress);

      switch (snapshot.state) {
        case "paused":
          console.log("Upload is Pause");
          break;
        case "running":
          console.log("Upload is Running");
          break;
        default:
          break;
      }
    },
    (err) => console.log(err),
    async () => {
      await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
        setData((prev) => ({ ...prev, img: downloadUrl }))
      );
    }
  );
};

// Firebase Database에 있는 데이터 삭제
export const deleteInitiate = (id) => {
  return async function (dispatch) {
    await deleteDoc(doc(productCollectionRef, id));
    dispatch(deleteProducts(id));
  };
};

// Storage에 있는 Image 삭제
export const deleteStorageFile = async (name) => {
  try {
    const deleteRef = ref(storage, `images/${name}`);
    await deleteObject(deleteRef);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

// Firebase Database에 있는 데이터 변경
export const updateInitiate = (productId, data) => async (dispatch) => {
  await updateDoc(doc(db, "products", productId), {
    ...data,
  })
    .then(() => {
      dispatch(editProducts({ data }));
    })
    .catch((err) => console.log(err));
};
