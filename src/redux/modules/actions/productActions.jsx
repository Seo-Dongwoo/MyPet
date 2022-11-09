import * as types from "../actionTypes/productActionTypes";
import { db, storage } from "../../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const setLoading = (data) => ({
  type: types.SET_LOADING,
  payload: data,
});

// const getProducts = (cafes) => ({
//   type: types.GET_PRODUCT,
//   payload: cafes,
// });

const addProducts = (data) => ({
  type: types.ADD_PRODUCT,
  payload: data,
});

// export const addInitiate = (data, image) => (dispatch) => {
//   console.log(data);
//   db.collection("products")
//     .add(data)
//     .then(async (res) => {
//       const document = await res.get();
//       const productData = { data: document.data(), id: document.id };
//       const uploadRef = storage.ref(`products/${document.id}`);

//       uploadRef.put(image).on(
//         "state_change",
//         (snapshot) => {},
//         (err) => {
//           console.log(err);
//         },
//         async () => {
//           const url = await uploadRef.getDownloadURL();
//           db.collection("products")
//             .doc(document.id)
//             .update({
//               image: url,
//             })
//             .then(() => {
//               productData.products.image = url;
//               dispatch(addProducts(productData));
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // 컬렉션의 여러 문서 수신 대기

const productCollectionRef = collection(db, "products");

// DB에 데이터 추가
export const addInitiate = (data) => {
  // console.log(data);
  return async function (dispatch) {
    await addDoc(productCollectionRef, data);
    dispatch(addProducts(data));
  };
};

export const uploadFiles = (file, setProgress) => {
  if (!file) return;
  const uploadRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(uploadRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
    }
  );
};
