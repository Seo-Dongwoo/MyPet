import * as types from "../actionTypes/userActionTypes";
import {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  db,
} from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = (user) => ({
  type: types.LOGOUT_SUCCESS,
  payload: user,
});

const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

const googleLoginStart = () => ({
  type: types.GOOGLE_LOGIN_START,
});

const googleLoginSuccess = (user) => ({
  type: types.GOOGLE_LOGIN_SUCCESS,
  payload: user,
});

const googleLoginFail = (error) => ({
  type: types.GOOGLE_LOGIN_FAIL,
  payload: error,
});

const githubLoginStart = () => ({
  type: types.GITHUB_LOGIN_START,
});

const githubLoginSuccess = (user) => ({
  type: types.GITHUB_LOGIN_SUCCESS,
  payload: user,
});

const githubLoginFail = (error) => ({
  type: types.GITHUB_LOGIN_FAIL,
  payload: error,
});

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const addUsers = (data) => ({
  type: types.ADD_USER,
  payload: data,
});

const userCollectionRef = collection(db, "users");

export const unsubscribe = (setData) =>
  onSnapshot(
    userCollectionRef,
    (snapshot) => {
      let userList = [];

      snapshot.docs.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() });
      });

      setData(userList);
    },
    (err) => {
      console.log(err);
    }
  );

export const registerInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(registerStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(registerSuccess(user));
      })
      .catch((error) => dispatch(registerFail(error.message)));
  };
};

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => dispatch(loginFail(error.message)));
  };
};

const setSocialUser = async (user) => {
  let username = user.displayName;
  let email = user.email;
  let photoURL = user.photoURL;
  let phoneNumber = user.phoneNumber;

  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
    photoURL,
    phoneNumber,
  });
};

export const googleLoginInitiate = () => {
  return function (dispatch) {
    dispatch(googleLoginStart());
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async ({ user }) => {
        dispatch(googleLoginSuccess(user));
        dispatch(addUsers(user));

        setSocialUser(user);
      })
      .catch((error) => dispatch(googleLoginFail(error.message)));
  };
};

export const githubLoginInitiate = () => {
  return function (dispatch) {
    dispatch(githubLoginStart());
    auth
      .signInWithPopup(githubAuthProvider)
      .then(async ({ user }) => {
        dispatch(githubLoginSuccess(user));
        dispatch(addUsers(user));

        setSocialUser(user);
      })
      .catch((error) => dispatch(githubLoginFail(error.message)));
  };
};

export const logoutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());
    auth
      .signOut()
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch((error) => dispatch(logoutFail(error.message)));
  };
};

// Firebase Database에 있는 데이터 삭제
export const deleteInitiate = (id) => {
  return async function () {
    await deleteDoc(doc(userCollectionRef, id));
  };
};
