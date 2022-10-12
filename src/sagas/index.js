import { all } from "redux-saga/effects";
import state from "./stateSaga";
import login from "./loginSaga";

const root = function* root() {
  yield all([state(), login()]);
};

export default root;
