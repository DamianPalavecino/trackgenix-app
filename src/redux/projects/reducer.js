import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_FULFILLED,
  GET_PROJECTS_REJECTED,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_FULFILLED,
  POST_PROJECTS_REJECTED,
  PUT_PROJECTS_PENDING,
  PUT_PROJECTS_FULFILLED,
  PUT_PROJECTS_REJECTED,
  GETBYID_PROJECT_REJECTED,
  GETBYID_PROJECT_FULFILLED,
  GETBYID_PROJECT_PENDING
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  message: '',
  request: '',
  status: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isPending: true,
        request: 'GET',
        status: 'pending'
      };
    case GET_PROJECTS_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: action.payload,
        status: 'success'
      };
    case GET_PROJECTS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        list: [],
        status: 'error'
      };
    case POST_PROJECTS_PENDING:
      return {
        ...state,
        request: 'POST',
        isPending: true,
        status: 'pending'
      };
    case POST_PROJECTS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        status: 'success'
      };
    case POST_PROJECTS_REJECTED:
      return {
        ...state,
        message: action.payload,
        status: 'error'
      };
    case PUT_PROJECTS_PENDING:
      return {
        ...state,
        request: 'PUT',
        isPending: true,
        status: 'pending'
      };
    case PUT_PROJECTS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        status: 'success'
      };
    case PUT_PROJECTS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        status: 'error'
      };
    case GETBYID_PROJECT_PENDING:
      return {
        ...state,
        request: 'GET_BY_ID',
        isPending: true,
        status: 'pending'
      };
    case GETBYID_PROJECT_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: action.payload,
        status: 'success'
      };
    case GETBYID_PROJECT_REJECTED:
      return {
        ...state,
        isPending: false,
        status: 'error',
        message: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
