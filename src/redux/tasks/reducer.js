import {
  GET_TASKS_PENDING,
  GET_TASKS_FULFILLED,
  GET_TASKS_REJECTED,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_FULFILLED,
  DELETE_TASKS_REJECTED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: '',
  status: '',
  request: ''
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
    default:
      return state;
  }
};

export default tasksReducer;
