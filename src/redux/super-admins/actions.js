import {
  GET_ADMINS_PENDING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GETBYID_ADMINS_PENDING,
  GETBYID_ADMINS_FULFILLED,
  GETBYID_ADMINS_REJECTED,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_FULFILLED,
  DELETE_ADMINS_REJECTED,
  POST_ADMINS_PENDING,
  POST_ADMINS_FULFILLED,
  POST_ADMINS_REJECTED,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_FULFILLED,
  PUT_ADMINS_REJECTED
} from './constants';

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsFulfilled = (data) => {
  return {
    type: GET_ADMINS_FULFILLED,
    payload: data
  };
};

export const getAdminsRejected = (error) => {
  return {
    type: GET_ADMINS_REJECTED,
    payload: error
  };
};

export const getByIdAdminsPending = () => {
  return {
    type: GETBYID_ADMINS_PENDING
  };
};

export const getByIdAdminsFulfilled = (data) => {
  return {
    type: GETBYID_ADMINS_FULFILLED,
    payload: data
  };
};

export const getByIdAdminsRejected = (error) => {
  return {
    type: GETBYID_ADMINS_REJECTED,
    payload: error
  };
};

export const deleteAdminsPending = () => {
  return {
    type: DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsFulfilled = (id) => {
  return {
    type: DELETE_ADMINS_FULFILLED,
    payload: id
  };
};

export const deleteAdminsRejected = (error) => {
  return {
    type: DELETE_ADMINS_REJECTED,
    payload: error
  };
};

export const postAdminsPending = () => {
  return {
    type: POST_ADMINS_PENDING
  };
};

export const postAdminsFulfilled = (message) => {
  return {
    type: POST_ADMINS_FULFILLED,
    payload: message
  };
};

export const postAdminsRejected = (error) => {
  return {
    type: POST_ADMINS_REJECTED,
    payload: error
  };
};

export const putAdminsPending = () => {
  return {
    type: PUT_ADMINS_PENDING
  };
};

export const putAdminsFulfilled = (message) => {
  return {
    type: PUT_ADMINS_FULFILLED,
    payload: message
  };
};

export const putAdminsRejected = (error) => {
  return {
    type: PUT_ADMINS_REJECTED,
    payload: error
  };
};
