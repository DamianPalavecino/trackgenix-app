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
  SET_AUTHENTICATION,
  GET_USER_PROFILE_REJECTED,
  GET_USER_PROFILE_PENDING,
  GET_USER_PROFILE_FULFILLED
} from './constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginFulfilled = (role) => {
  return {
    type: LOGIN_FULFILLED,
    payload: role
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

export const setAuthentication = (payload) => {
  return {
    type: SET_AUTHENTICATION,
    payload
  };
};

export const getUserProfileRejected = (error) => {
  return {
    type: GET_USER_PROFILE_REJECTED,
    payload: error
  };
};

export const getUserProfilePending = () => {
  return {
    type: GET_USER_PROFILE_PENDING
  };
};

export const getUserProfileFulfilled = (data) => {
  return {
    type: GET_USER_PROFILE_FULFILLED,
    payload: data
  };
};
