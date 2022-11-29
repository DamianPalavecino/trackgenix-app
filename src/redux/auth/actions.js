import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SIGN_UP_PENDING,
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
  SET_AUTHENTICATION
} from './constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginFulfilled = (data) => {
  return {
    type: LOGIN_FULFILLED,
    payload: data
  };
};

export const loginRejected = (error) => {
  return {
    type: LOGIN_REJECTED,
    payload: error
  };
};

export const signUpPending = () => {
  return {
    type: SIGN_UP_PENDING
  };
};

export const signUpFulfilled = (data) => {
  return {
    type: SIGN_UP_FULFILLED,
    payload: data
  };
};

export const signUpRejected = (error) => {
  return {
    type: SIGN_UP_REJECTED,
    payload: error
  };
};

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const logoutFulfilled = (data) => {
  return {
    type: LOGOUT_FULFILLED,
    payload: data
  };
};

export const logoutRejected = (error) => {
  return {
    type: LOGOUT_REJECTED,
    payload: error
  };
};

export const setAuthentication = (role) => {
  return {
    type: SET_AUTHENTICATION,
    payload: role
  };
};
