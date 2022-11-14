import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_REJECTED,
  GET_EMPLOYEES_FULFILLED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
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
        error: action.payload
      };
    default:
      return state;
  }
};

export default employeesReducer;
