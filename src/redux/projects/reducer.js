import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_FULFILLED,
  GET_PROJECTS_REJECTED,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_FULFILLED,
  POST_PROJECTS_REJECTED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  message: '',
  status: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isPending: true,
        status: ''
      };
    case GET_PROJECTS_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case GET_PROJECTS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_PROJECTS_PENDING:
      return {
        ...state,
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
    default:
      return state;
  }
};

export default reducer;
