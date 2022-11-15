import {
  GET_TASKS_PENDING,
  GET_TASKS_FULFILLED,
  GET_TASKS_REJECTED,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_FULFILLED,
  DELETE_TASKS_REJECTED,
  POST_TASKS_PENDING,
  POST_TASKS_FULFILLED,
  POST_TASKS_REJECTED,
  PUT_TASKS_PENDING,
  PUT_TASKS_FULFILLED,
  PUT_TASKS_REJECTED,
  GETBYID_TASKS_PENDING,
  GETBYID_TASKS_FULFILLED,
  GETBYID_TASKS_REJECTED
} from './constants';

export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksFulfilled = (data) => {
  return {
    type: GET_TASKS_FULFILLED,
    payload: data
  };
};

export const getTasksRejected = (error) => {
  return {
    type: GET_TASKS_REJECTED,
    payload: error
  };
};

export const deleteTasksPending = () => {
  return {
    type: DELETE_TASKS_PENDING
  };
};

export const deleteTasksFulfilled = (id) => {
  return {
    type: DELETE_TASKS_FULFILLED,
    payload: id
  };
};

export const deleteTasksRejected = (error) => {
  return {
    type: DELETE_TASKS_REJECTED,
    payload: error
  };
};

export const postTasksPending = () => {
  return {
    type: POST_TASKS_PENDING
  };
};

export const postTasksFulfilled = (message) => {
  return {
    type: POST_TASKS_FULFILLED,
    payload: message
  };
};

export const postTasksRejected = (error) => {
  return {
    type: POST_TASKS_REJECTED,
    payload: error
  };
};

export const putTasksPending = () => {
  return {
    type: PUT_TASKS_PENDING
  };
};

export const putTasksFulfilled = (message) => {
  return {
    type: PUT_TASKS_FULFILLED,
    payload: message
  };
};

export const putTasksRejected = (error) => {
  return {
    type: PUT_TASKS_REJECTED,
    payload: error
  };
};

export const getByIdTasksPending = () => {
  return {
    type: GETBYID_TASKS_PENDING
  };
};

export const getByIdTasksFulfilled = (data) => {
  return {
    type: GETBYID_TASKS_FULFILLED,
    payload: data
  };
};

export const getByIdTasksRejected = (error) => {
  return {
    type: GETBYID_TASKS_REJECTED,
    payload: error
  };
};
