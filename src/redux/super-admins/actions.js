import { GET_ADMINS_PENDING, GET_ADMINS_FULFILLED, GET_ADMINS_REJECTED } from './constants';

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
