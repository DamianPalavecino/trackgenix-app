import { GET_PROJECTS_PENDING, GET_PROJECTS_FULFILLED, GET_PROJECTS_REJECTED } from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isPending: true
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
        error: action.payload,
        list: []
      };
    default:
      return state;
  }
};

export default reducer;
