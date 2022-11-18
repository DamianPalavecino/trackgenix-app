import {
  getTasksPending,
  getTasksFulfilled,
  getTasksRejected,
  deleteTasksPending,
  deleteTasksFulfilled,
  deleteTasksRejected,
  postTasksPending,
  postTasksFulfilled,
  postTasksRejected,
  putTasksPending,
  putTasksFulfilled,
  putTasksRejected,
  getByIdTasksPending,
  getByIdTasksFulfilled,
  getByIdTasksRejected
} from './actions';

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(getTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getTasksFulfilled(response.data));
        }
      })
      .catch((error) => {
        dispatch(getTasksRejected(error.toString()));
      });
  };
};

export const deleteTasks = (id) => {
  return async (dispatch) => {
    dispatch(deleteTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteTasksFulfilled(id));
        }
      })
      .catch((error) => {
        dispatch(deleteTasksRejected(error.toString()));
      });
  };
};

export const postTasks = (newTask) => {
  return async (dispatch) => {
    try {
      dispatch(postTasksPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(postTasksFulfilled(data.message));
      } else {
        return dispatch(postTasksRejected(data.message));
      }
    } catch (error) {
      return dispatch(postTasksRejected(error.toString()));
    }
  };
};

export const putTasks = (id, editedTask) => {
  return async (dispatch) => {
    try {
      dispatch(putTasksPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTask)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(putTasksFulfilled(data.message));
      } else {
        return dispatch(putTasksRejected(data.message));
      }
    } catch (error) {
      return dispatch(putTasksRejected(error.toString()));
    }
  };
};

export const getTasksById = (id) => {
  return async (dispatch) => {
    dispatch(getByIdTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getByIdTasksFulfilled(response.data));
        }
      })
      .catch((error) => {
        dispatch(getByIdTasksRejected(error.toString()));
      });
  };
};
