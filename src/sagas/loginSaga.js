import { takeLatest, put } from "redux-saga/effects";
import { AUTH_STATE, LOGIN_STATE, LOGIN_ACTION } from "../constants/redux";
import { firebaseSDK } from "../libs/firebase";
import { setAuthState } from "../stores/appSlice";
import { setLoginState } from "../stores/loginSlice";
import { saveUserToDatabase } from "../libs/database/user";

const login = function* login(action) {
  const { email, password } = action;

  console.log(email, password);

  yield put(setLoginState(LOGIN_STATE.REQUEST));

  const user = yield firebaseSDK.signInEmailPassword(email, password);

  if (user) {
    const userInfo = yield firebaseSDK.getUser(user.user.uid);

    const updateToken = yield firebaseSDK.setFcmToken(user.user.uid);

    console.log(userInfo);

    yield saveUserToDatabase(userInfo);
    yield put(setLoginState(LOGIN_STATE.SUCCESS));
    yield put(setAuthState(AUTH_STATE.AUTHED));
  } else {
    yield put(setLoginState(LOGIN_STATE.FAILED));
  }
};

const signUp = function* signUp() {
  const user = yield firebaseSDK.authorizedUser();
  console.log(user);
  if (user) {
    try {
      const userInfo = yield firebaseSDK.getUser(user.uid);

      console.log(userInfo);
      yield put(setAuthState(AUTH_STATE.AUTHED));
    } catch (error) {
      yield firebaseSDK.signOut();
      yield put(setAuthState(AUTH_STATE.NOAUTH));
    }
  } else {
    yield put(setAuthState(AUTH_STATE.NOAUTH));
  }
};

const logout = function* logout() {
  yield firebaseSDK.signOut();
  yield put(setAuthState(AUTH_STATE.NOAUTH));
};

const root = function* root() {
  yield takeLatest(LOGIN_ACTION.LOGIN, login);
  yield takeLatest(LOGIN_ACTION.LOGOUT, logout);
  yield takeLatest(LOGIN_ACTION.SIGNUP, signUp);
};

export default root;
