import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appReducer from "./appSlice";
import loginReducer from "./loginSlice";
import saga from "../sagas";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    auth_state: appReducer,
    login_state: loginReducer,
  },
  middleware,
});

sagaMiddleware.run(saga);
