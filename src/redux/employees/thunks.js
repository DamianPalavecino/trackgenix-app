import {
  getEmployeesFulfilled,
  getEmployeesPending,
  getEmployeesRejected,
  deleteEmployeesFulfilled,
  deleteEmployeesPending,
  deleteEmployeesRejected,
  putEmployeesFulfilled,
  putEmployeesPending,
  putEmployeesRejected,
  getByIdEmployeesPending,
  getByIdEmployeesFulfilled,
  getByIdEmployeesRejected
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

export const getByIdEmployees = (id) => {
  return async (dispatch) => {
    dispatch(getByIdEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getByIdEmployeesFulfilled(response.data));
        }
      })
      .catch((error) => dispatch(getByIdEmployeesRejected(error.toString())));
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

export const postEmployee = (newEmployee) => {
  return (dispatch) => {
    dispatch(putEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmployee)
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
