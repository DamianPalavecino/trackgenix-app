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
  DELETE_PROJECT_REJECTED,
  ASSIGN_EMPLOYEE_PENDING,
  ASSIGN_EMPLOYEE_FULFILLED,
  ASSIGN_EMPLOYEE_REJECTED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  message: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_PROJECT_PENDING:
    case GETBYID_PROJECT_PENDING:
    case PUT_PROJECTS_PENDING:
    case POST_PROJECTS_PENDING:
    case ASSIGN_EMPLOYEE_PENDING:
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
    case POST_PROJECTS_REJECTED:
    case DELETE_PROJECT_REJECTED:
    case PUT_PROJECTS_REJECTED:
    case GET_PROJECTS_REJECTED:
    case GETBYID_PROJECT_REJECTED:
    case ASSIGN_EMPLOYEE_REJECTED:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        list: []
      };
    case POST_PROJECTS_FULFILLED:
    case PUT_PROJECTS_FULFILLED:
    case ASSIGN_EMPLOYEE_FULFILLED:
      return {
        ...state,
        isPending: false,
        message: action.payload
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
    case DELETE_PROJECT_FULFILLED:
      return {
        ...state,
        isPending: false,
        list: [...state.list.filter((project) => project._id !== action.payload)]
      };
    default:
      return state;
  }
};

export default reducer;
