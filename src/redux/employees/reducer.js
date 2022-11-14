import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_REJECTED,
  GET_EMPLOYEES_FULFILLED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_EMPLOYEES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default employeesReducer;
