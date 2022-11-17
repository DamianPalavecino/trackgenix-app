import {
  GET_ADMINS_PENDING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GETBYID_ADMINS_PENDING,
  GETBYID_ADMINS_FULFILLED,
  GETBYID_ADMINS_REJECTED,
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
  message: ''
};

const superAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
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
        message: action.payload
      };
    case GETBYID_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GETBYID_ADMINS_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case GETBYID_ADMINS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case DELETE_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
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
        message: action.payload
      };
    case POST_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case POST_ADMINS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_ADMINS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case PUT_ADMINS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_ADMINS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    default:
      return state;
  }
};

export default superAdminReducer;
