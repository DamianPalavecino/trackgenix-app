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
  message: ''
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_TASKS_FULFILLED:
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    case GET_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case DELETE_TASKS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_TASKS_FULFILLED:
      return {
        ...state,
        list: [...state.list.filter((task) => task._id !== action.payload)],
        isPending: false
      };
    case DELETE_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_TASKS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case POST_TASKS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_TASKS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case PUT_TASKS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case GETBYID_TASKS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GETBYID_TASKS_FULFILLED:
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    case GETBYID_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    default:
      return state;
  }
};

export default tasksReducer;
