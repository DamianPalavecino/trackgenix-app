import {
  getEmployeesFulfilled,
  getEmployeesPending,
  getEmployeesRejected,
  deleteEmployeesFulfilled,
  deleteEmployeesPending,
  deleteEmployeesRejected,
  putEmployeesFulfilled,
  putEmployeesPending,
  putEmployeesRejected
} from './actions';

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

export const deleteEmployee = (id) => {
  return (dispatch) => {
    dispatch(deleteEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(deleteEmployeesFulfilled(id));
        }
      })
      .catch((error) => dispatch(deleteEmployeesRejected(error.toString())));
  };
};

export const editEmployee = (id, data) => {
  return (dispatch) => {
    dispatch(putEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(putEmployeesFulfilled(response.message));
        }
      })
      .catch((error) => dispatch(putEmployeesRejected(error.toString())));
  };
};
