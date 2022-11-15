import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_FULFILLED,
  GET_PROJECTS_REJECTED,
  POST_PROJECTS_FULFILLED,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_REJECTED
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
