import { GET_TASKS_PENDING, GET_TASKS_FULFILLED, GET_TASKS_REJECTED } from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
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
        isPending: false,
        list: action.payload
      };
    case GET_TASKS_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default tasksReducer;
