import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_FULFILLED,
  GET_TIMESHEETS_REJECTED,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_FULFILLED,
  DELETE_TIMESHEETS_REJECTED,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_FULFILLED,
  POST_TIMESHEETS_REJECTED,
  PUT_TIMESHEETS_PENDING,
  PUT_TIMESHEETS_FULFILLED,
  PUT_TIMESHEETS_REJECTED,
  GETBYID_TIMESHEETS_PENDING,
  GETBYID_TIMESHEETS_FULFILLED,
  GETBYID_TIMESHEETS_REJECTED
} from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimesheetsFulfilled = (data) => {
  return {
    type: GET_TIMESHEETS_FULFILLED,
    payload: data
  };
};

export const getTimesheetsRejected = (error) => {
  return {
    type: GET_TIMESHEETS_REJECTED,
    payload: error
  };
};

export const deleteTimesheetsPending = () => {
  return {
    type: DELETE_TIMESHEETS_PENDING
  };
};

export const deleteTimesheetsFulfilled = (id) => {
  return {
    type: DELETE_TIMESHEETS_FULFILLED,
    payload: id
  };
};

export const deleteTimesheetsRejected = (error) => {
  return {
    type: DELETE_TIMESHEETS_REJECTED,
    payload: error
  };
};

export const postTimesheetsPending = () => {
  return {
    type: POST_TIMESHEETS_PENDING
  };
};

export const postTimesheetsFulfilled = (message) => {
  return {
    type: POST_TIMESHEETS_FULFILLED,
    payload: message
  };
};

export const postTimesheetsRejected = (error) => {
  return {
    type: POST_TIMESHEETS_REJECTED,
    payload: error
  };
};

export const putTimesheetsPending = () => {
  return {
    type: PUT_TIMESHEETS_PENDING
  };
};

export const putTimesheetsFulfilled = (message) => {
  return {
    type: PUT_TIMESHEETS_FULFILLED,
    payload: message
  };
};

export const putTimesheetsRejected = (error) => {
  return {
    type: PUT_TIMESHEETS_REJECTED,
    payload: error
  };
};

export const getByIdTimesheetsPending = () => {
  return {
    type: GETBYID_TIMESHEETS_PENDING
  };
};

export const getByIdTimesheetsFulfilled = (data) => {
  return {
    type: GETBYID_TIMESHEETS_FULFILLED,
    payload: data
  };
};

export const getByIdTimesheetsRejected = (error) => {
  return {
    type: GETBYID_TIMESHEETS_REJECTED,
    payload: error
  };
};
