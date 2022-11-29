import {
  getTimesheetsPending,
  getTimesheetsFulfilled,
  getTimesheetsRejected,
  deleteTimesheetsPending,
  deleteTimesheetsFulfilled,
  deleteTimesheetsRejected,
  postTimesheetsPending,
  postTimesheetsFulfilled,
  postTimesheetsRejected,
  putTimesheetsPending,
  putTimesheetsFulfilled,
  putTimesheetsRejected,
  getByIdTimesheetsPending,
  getByIdTimesheetsFulfilled,
  getByIdTimesheetsRejected
} from './actions';

const token = sessionStorage.getItem('token');

export const getTimesheets = () => {
  return async (dispatch) => {
    dispatch(getTimesheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/timesheets`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getTimesheetsFulfilled(response.data));
        }
      })
      .catch((error) => {
        dispatch(getTimesheetsRejected(error.toString()));
      });
  };
};

export const deleteTimesheets = (id) => {
  return async (dispatch) => {
    dispatch(deleteTimesheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
      method: 'DELETE',
      token
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteTimesheetsFulfilled(id));
        }
      })
      .catch((error) => {
        dispatch(deleteTimesheetsRejected(error.toString()));
      });
  };
};

export const postTimesheets = (newTimesheet) => {
  return async (dispatch) => {
    try {
      dispatch(postTimesheetsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(newTimesheet)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(postTimesheetsFulfilled(data.message));
      } else {
        return dispatch(postTimesheetsRejected(data.message));
      }
    } catch (error) {
      return dispatch(postTimesheetsRejected(error.toString()));
    }
  };
};

export const putTimesheets = (id, editedTimesheet) => {
  return async (dispatch) => {
    try {
      dispatch(putTimesheetsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(editedTimesheet)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(putTimesheetsFulfilled(data.message));
      } else {
        return dispatch(putTimesheetsRejected(data.message));
      }
    } catch (error) {
      return dispatch(putTimesheetsRejected(error.toString()));
    }
  };
};

export const getTimesheetsById = (id) => {
  return async (dispatch) => {
    dispatch(getByIdTimesheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getByIdTimesheetsFulfilled(response.data));
        }
      })
      .catch((error) => {
        dispatch(getByIdTimesheetsRejected(error.toString()));
      });
  };
};
