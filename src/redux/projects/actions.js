import { GET_PROJECTS_PENDING, GET_PROJECTS_FULFILLED, GET_PROJECTS_REJECTED } from './constants';

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
