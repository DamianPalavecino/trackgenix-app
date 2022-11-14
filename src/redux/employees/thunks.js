import { getEmployeesFulfilled, getEmployeesPending, getEmployeesRejected } from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getEmployeesFulfilled(response.data));
        }
      })
      .catch((error) => dispatch(getEmployeesRejected(error.toString())));
  };
};
