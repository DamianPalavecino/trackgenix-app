import { GET_TASKS_PENDING, GET_TASKS_FULFILLED, GET_TASKS_REJECTED } from './constants';

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
