export const APP_STATE_ACTION = {
  FOREGROUND: "FOREGROUND",
  BACKGROUND: "BACKGROUND",
  INACTIVE: "INACTIVE",
};

export const AUTH_STATE = {
  UNCHECK: "app_splash",
  AUTHED: "app_auth",
  NOAUTH: "app_noauth",
};

export const LOGIN_STATE = {
  NONE: "auth_none",
  REQUEST: "auth_request",
  FAILED: "auth_failed",
  SUCCESS: "auth_success",
};

export const LOGIN_ACTION = {
  LOGIN: "action_login",
  SIGNUP: "action_signup",
  LOGOUT: "action_logout",
};
