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

const INITIAL_STATE = {
  list: [],
  isPending: false,
  message: ''
};

const timeSheetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_TIMESHEETS_FULFILLED:
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    case GET_TIMESHEETS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case DELETE_TIMESHEETS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_TIMESHEETS_FULFILLED:
      return {
        ...state,
        list: [...state.list.filter((timesheet) => timesheet._id !== action.payload)],
        isPending: false
      };
    case DELETE_TIMESHEETS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_TIMESHEETS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case POST_TIMESHEETS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_TIMESHEETS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_TIMESHEETS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case PUT_TIMESHEETS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_TIMESHEETS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case GETBYID_TIMESHEETS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GETBYID_TIMESHEETS_FULFILLED:
      return {
        ...state,
        list: { ...action.payload, date: action.payload.date.slice(0, 10) },
        isPending: false
      };
    case GETBYID_TIMESHEETS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    default:
      return state;
  }
};

export default timeSheetReducer;
