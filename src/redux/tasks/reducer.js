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

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: '',
  status: '',
  request: '',
  message: ''
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isPending: true,
        status: 'pending',
        request: 'GET'
      };
    case GET_TASKS_FULFILLED:
      return {
        ...state,
        list: action.payload,
        isPending: false,
        status: 'success'
      };
    case GET_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        status: 'error'
      };
    case DELETE_TASKS_PENDING:
      return {
        ...state,
        isPending: true,
        status: 'pending',
        request: 'DELETE'
      };
    case DELETE_TASKS_FULFILLED:
      return {
        ...state,
        list: [...state.list.filter((task) => task._id !== action.payload)],
        isPending: false,
        status: 'success'
      };
    case DELETE_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        status: 'error'
      };
    case POST_TASKS_PENDING:
      return {
        ...state,
        isPending: true,
        status: 'pending',
        request: 'POST'
      };
    case POST_TASKS_FULFILLED:
      return {
        ...state,
        isPending: false,
        status: 'success',
        message: action.payload
      };
    case POST_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        status: 'error',
        message: action.payload
      };
    case PUT_TASKS_PENDING:
      return {
        ...state,
        isPending: true,
        status: 'pending',
        request: 'PUT'
      };
    case PUT_TASKS_FULFILLED:
      return {
        ...state,
        isPending: false,
        status: 'success',
        message: action.payload
      };
    case PUT_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        status: 'error',
        message: action.payload
      };
    case GETBYID_TASKS_PENDING:
      return {
        ...state,
        isPending: true,
        status: 'pending',
        request: 'GETBYID'
      };
    case GETBYID_TASKS_FULFILLED:
      return {
        ...state,
        list: action.payload,
        isPending: false,
        status: 'success'
      };
    case GETBYID_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        status: 'error'
      };
    default:
      return state;
  }
};

export default tasksReducer;
