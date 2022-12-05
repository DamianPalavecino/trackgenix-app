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
  getByIdEmployeesRejected,
  postEmployeesFulfilled,
  postEmployeesRejected,
  postEmployeesPending
} from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/employees`, { headers: { token } })
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
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { headers: { token } })
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
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteEmployeesFulfilled(id));
        }
      })
      .catch((error) => {
        dispatch(deleteEmployeesRejected(error.toString()));
      });
  };
};

export const putEmployee = (id, editedEmployee) => {
  return async (dispatch) => {
    try {
      dispatch(putEmployeesPending());
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(editedEmployee)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(putEmployeesFulfilled(data.message));
      } else {
        return dispatch(putEmployeesRejected(data.message));
      }
    } catch (error) {
      return dispatch(putEmployeesRejected(error.toString()));
    }
  };
};

export const postEmployee = (newEmployee) => {
  return async (dispatch) => {
    try {
      dispatch(postEmployeesPending());
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(newEmployee)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(postEmployeesFulfilled(data.message));
      } else {
        return dispatch(postEmployeesRejected(data.message));
      }
    } catch (error) {
      return dispatch(postEmployeesRejected(error.toString()));
    }
  };
};
