import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_FULFILLED,
  GET_EMPLOYEES_REJECTED,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_FULFILLED,
  DELETE_EMPLOYEES_REJECTED,
  PUT_EMPLOYEES_PENDING,
  PUT_EMPLOYEES_FULFILLED,
  PUT_EMPLOYEES_REJECTED,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_FULFILLED,
  POST_EMPLOYEES_REJECTED,
  GETBYID_EMPLOYEES_PENDING,
  GETBYID_EMPLOYEES_FULFILLED,
  GETBYID_EMPLOYEES_REJECTED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  message: ''
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_EMPLOYEES_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case GET_EMPLOYEES_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case GETBYID_EMPLOYEES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GETBYID_EMPLOYEES_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case GETBYID_EMPLOYEES_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case DELETE_EMPLOYEES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_EMPLOYEES_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: [...state.list.filter((employees) => employees._id !== action.payload)]
      };
    case DELETE_EMPLOYEES_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_EMPLOYEES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case PUT_EMPLOYEES_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_EMPLOYEES_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_EMPLOYEES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case POST_EMPLOYEES_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_EMPLOYEES_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    default:
      return state;
  }
};

export default employeesReducer;
