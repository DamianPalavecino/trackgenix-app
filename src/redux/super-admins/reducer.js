import { GET_ADMINS_PENDING, GET_ADMINS_FULFILLED, GET_ADMINS_REJECTED } from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
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
        error: action.payload
      };
    default:
      return state;
  }
};

export default superAdminReducer;
