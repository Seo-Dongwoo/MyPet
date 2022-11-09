import * as types from "../actionTypes/userActionTypes";
import {
  auth,
  googleAuthProvider,
  githubAuthProvider,
} from "../../../firebase";

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

export const googleLoginInitiate = () => {
  return function (dispatch) {
    dispatch(googleLoginStart());
    auth
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(googleLoginSuccess(user));
      })
      .catch((error) => dispatch(googleLoginFail(error.message)));
  };
};

export const githubLoginInitiate = () => {
  return function (dispatch) {
    dispatch(githubLoginStart());
    auth
      .signInWithPopup(githubAuthProvider)
      .then(({ user }) => {
        dispatch(githubLoginSuccess(user));
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
