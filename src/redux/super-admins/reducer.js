import {
  GET_ADMINS_PENDING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_FULFILLED,
  DELETE_ADMINS_REJECTED,
  POST_ADMINS_PENDING,
  POST_ADMINS_FULFILLED,
  POST_ADMINS_REJECTED,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_FULFILLED,
  PUT_ADMINS_REJECTED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: '',
  status: '',
  request: ''
};

const superAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isPending: true,
        status: 'pending',
        request: 'GET'
      };
    case GET_ADMINS_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case GET_ADMINS_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case DELETE_ADMINS_PENDING:
      return {
        ...state,
        isPending: true,
        request: 'DELETE'
      };
    case DELETE_ADMINS_FULFILLED:
      return {
        ...state,
        list: [...state.list.filter((admins) => admins._id !== action.payload)],
        isPending: false
      };
    case DELETE_ADMINS_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case POST_ADMINS_PENDING:
      return {
        ...state,
        isPending: true,
        status: 'pending',
        request: 'POST'
      };
    case POST_ADMINS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        status: 'success'
      };
    case POST_ADMINS_REJECTED:
      return {
        ...state,
        message: action.payload,
        status: 'error'
      };
    case PUT_ADMINS_PENDING:
      return {
        ...state,
        isPending: true,
        status: 'pending',
        request: 'PUT'
      };
    case PUT_ADMINS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        status: 'success'
      };
    case PUT_ADMINS_REJECTED:
      return {
        ...state,
        message: action.payload,
        status: 'error'
      };
    default:
      return state;
  }
};

export default superAdminReducer;
