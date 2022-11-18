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
  GETBYID_PROJECT_PENDING,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_FULFILLED,
  DELETE_PROJECT_REJECTED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  message: ''
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
        message: action.payload,
        list: []
      };
    case POST_PROJECTS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case POST_PROJECTS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case POST_PROJECTS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_PROJECTS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case PUT_PROJECTS_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case PUT_PROJECTS_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case GETBYID_PROJECT_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GETBYID_PROJECT_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: {
          ...action.payload,
          startDate: action.payload.startDate.slice(0, 10),
          endDate: action.payload.endDate.slice(0, 10)
        }
      };
    case GETBYID_PROJECT_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_PROJECT_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: [...state.list.filter((project) => project._id !== action.payload)]
      };
    case DELETE_PROJECT_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
