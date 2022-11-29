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
  SET_AUTHENTICATION,
  GET_USER_PROFILE_REJECTED,
  GET_USER_PROFILE_PENDING,
  GET_USER_PROFILE_FULFILLED
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
    case GET_USER_PROFILE_PENDING:
      return {
        ...state,
        isPending: true
      };
    case LOGIN_REJECTED:
    case LOGOUT_REJECTED:
    case SIGN_UP_REJECTED:
    case GET_USER_PROFILE_REJECTED:
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
        role: action.payload
      };
    }
    case GET_USER_PROFILE_FULFILLED: {
      return {
        ...state,
        isPending: false,
        data: action.payload
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
