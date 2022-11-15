import {
  GET_ADMINS_PENDING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_FULFILLED,
  DELETE_ADMINS_REJECTED,
  POST_ADMINS_PENDING,
  POST_ADMINS_FULFILLED,
  POST_ADMINS_REJECTED
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

export const deleteAdminsPending = () => {
  return {
    type: DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsFulfilled = (data) => {
  return {
    type: DELETE_ADMINS_FULFILLED,
    payload: data
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
