import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SIGN_UP_PENDING,
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
  SET_AUTHENTICATION
} from './constants';

const INITIAL_STATE = {
  isPending: false,
  authenticated: false,
  role: '',
  email: '',
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
    case SIGN_UP_PENDING:
      return {
        ...state,
        isPending: true
      };
    case LOGIN_REJECTED:
    case LOGOUT_REJECTED:
    case SIGN_UP_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case LOGIN_FULFILLED: {
      return {
        ...state,
        isPending: false,
        authenticated: true,
        role: action.payload.role
      };
    }
    case LOGOUT_FULFILLED: {
      return {
        ...state,
        isPending: false,
        authenticated: false,
        role: null
      };
    }
    case SIGN_UP_FULFILLED: {
      return {
        ...state,
        isPending: false
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: true,
        role: action.payload.role,
        email: action.payload.email
      };
    }
    default:
      return state;
  }
};

export default reducer;
