import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_FULFILLED,
  GET_PROJECTS_REJECTED,
  POST_PROJECTS_FULFILLED,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_REJECTED,
  PUT_PROJECTS_PENDING,
  PUT_PROJECTS_FULFILLED,
  PUT_PROJECTS_REJECTED,
  GETBYID_PROJECT_PENDING,
  GETBYID_PROJECT_FULFILLED,
  GETBYID_PROJECT_REJECTED,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_FULFILLED,
  DELETE_PROJECT_REJECTED,
  ASSIGN_EMPLOYEE_PENDING,
  ASSIGN_EMPLOYEE_FULFILLED,
  ASSIGN_EMPLOYEE_REJECTED
} from './constants';

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

export const getProjectsFulfilled = (data) => {
  return {
    type: GET_PROJECTS_FULFILLED,
    payload: data
  };
};

export const getProjectsRejected = (error) => {
  return {
    type: GET_PROJECTS_REJECTED,
    payload: error
  };
};

export const postProjectsPending = () => {
  return {
    type: POST_PROJECTS_PENDING
  };
};

export const postProjectsFulfilled = (message) => {
  return {
    type: POST_PROJECTS_FULFILLED,
    payload: message
  };
};

export const postProjectsRejected = (error) => {
  return {
    type: POST_PROJECTS_REJECTED,
    payload: error
  };
};

export const putProjectsPending = () => {
  return {
    type: PUT_PROJECTS_PENDING
  };
};

export const putProjectsFulfilled = (message) => {
  return {
    type: PUT_PROJECTS_FULFILLED,
    payload: message
  };
};

export const putProjectsRejected = (error) => {
  return {
    type: PUT_PROJECTS_REJECTED,
    payload: error
  };
};

export const getByIdProjectPending = () => {
  return {
    type: GETBYID_PROJECT_PENDING
  };
};

export const getByIdProjectFulfilled = (data) => {
  return {
    type: GETBYID_PROJECT_FULFILLED,
    payload: data
  };
};

export const getByIdProjectRejected = (error) => {
  return {
    type: GETBYID_PROJECT_REJECTED,
    payload: error
  };
};

export const deleteProjectPending = () => {
  return {
    type: DELETE_PROJECT_PENDING
  };
};

export const deleteProjectFulfilled = (id) => {
  return {
    type: DELETE_PROJECT_FULFILLED,
    payload: id
  };
};

export const deleteProjectRejected = (error) => {
  return {
    type: DELETE_PROJECT_REJECTED,
    payload: error
  };
};

export const assignEmployeePending = () => {
  return {
    type: ASSIGN_EMPLOYEE_PENDING
  };
};

export const assignEmployeeFulfilled = (message) => {
  return {
    type: ASSIGN_EMPLOYEE_FULFILLED,
    payload: message
  };
};

export const assignEmployeeRejected = (error) => {
  return {
    type: ASSIGN_EMPLOYEE_REJECTED,
    payload: error
  };
};
