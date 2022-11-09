import * as types from "../actionTypes/productActionTypes";
import { db, storage } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const setLoading = (data) => ({
  type: types.SET_LOADING,
  payload: data,
});

const addProducts = (data) => ({
  type: types.ADD_PRODUCT,
  payload: data,
});

const productCollectionRef = collection(db, "products");

// DB에 데이터 추가
export const addInitiate = (data) => {
  setLoading();
  return async function (dispatch) {
    await addDoc(productCollectionRef, data);
    dispatch(addProducts(data));
  };
};

// Storage에 image파일 저장하기
export const uploadFiles = (file, setProgress, setData) => {
  const uploadRef = ref(storage, `images/${file.name}`);
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
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
        setData((prev) => ({ ...prev, img: downloadUrl }))
      );
    }
  );
};
