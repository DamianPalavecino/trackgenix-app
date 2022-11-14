import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_FULFILLED,
  GET_EMPLOYEES_REJECTED
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
