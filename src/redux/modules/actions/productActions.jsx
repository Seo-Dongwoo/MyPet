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

const productCollectionRef = collection(db, "products");

export const unsubscribeProduct = (setData) =>
  onSnapshot(
    productCollectionRef,
    (snapshot) => {
      let productList = [];

      snapshot.docs.forEach((doc) => {
        productList.push({ id: doc.id, ...doc.data() });
      });

      setData(productList);
    },
    (err) => {
      console.log(err);
    }
  );

// Firebase Database에 있는 데이터 추가
export const addInitiate = (data) => {
  return async function () {
    await addDoc(productCollectionRef, data);
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
  return async function () {
    await deleteDoc(doc(productCollectionRef, id));
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
export const updateInitiate = (productId, data) => async () => {
  await updateDoc(doc(db, "products", productId), {
    ...data,
  });
};
