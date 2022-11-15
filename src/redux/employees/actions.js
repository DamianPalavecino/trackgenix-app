import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_FULFILLED,
  GET_EMPLOYEES_REJECTED,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_FULFILLED,
  DELETE_EMPLOYEES_REJECTED,
  PUT_EMPLOYEES_PENDING,
  PUT_EMPLOYEES_FULFILLED,
  PUT_EMPLOYEES_REJECTED,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_FULFILLED,
  POST_EMPLOYEES_REJECTED,
  GETBYID_EMPLOYEES_PENDING,
  GETBYID_EMPLOYEES_FULFILLED,
  GETBYID_EMPLOYEES_REJECTED
} from './constants';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesFulfilled = (data) => {
  return {
    type: GET_EMPLOYEES_FULFILLED,
    payload: data
  };
};

export const getEmployeesRejected = (error) => {
  return {
    type: GET_EMPLOYEES_REJECTED,
    payload: error
  };
};

export const deleteEmployeesPending = () => {
  return {
    type: DELETE_EMPLOYEES_PENDING
  };
};

export const deleteEmployeesFulfilled = (id) => {
  return {
    type: DELETE_EMPLOYEES_FULFILLED,
    payload: id
  };
};

export const deleteEmployeesRejected = (error) => {
  return {
    type: DELETE_EMPLOYEES_REJECTED,
    payload: error
  };
};

export const putEmployeesPending = () => {
  return {
    type: PUT_EMPLOYEES_PENDING
  };
};

export const putEmployeesFulfilled = (message) => {
  return {
    type: PUT_EMPLOYEES_FULFILLED,
    payload: message
  };
};

export const putEmployeesRejected = (error) => {
  return {
    type: PUT_EMPLOYEES_REJECTED,
    payload: error
  };
};

export const postEmployeesPending = () => {
  return {
    type: POST_EMPLOYEES_PENDING
  };
};

export const postEmployeesFulfilled = (message) => {
  return {
    type: POST_EMPLOYEES_FULFILLED,
    payload: message
  };
};

export const postEmployeesRejected = (error) => {
  return {
    type: POST_EMPLOYEES_REJECTED,
    payload: error
  };
};

export const getByIdEmployeesPending = () => {
  return {
    type: GETBYID_EMPLOYEES_PENDING
  };
};

export const getByIdEmployeesFulfilled = (data) => {
  return {
    type: GETBYID_EMPLOYEES_FULFILLED,
    payload: data
  };
};

export const getByIdEmployeesRejected = (error) => {
  return {
    type: GETBYID_EMPLOYEES_REJECTED,
    payload: error
  };
};
