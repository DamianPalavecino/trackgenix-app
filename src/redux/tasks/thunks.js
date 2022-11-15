import {
  getTasksPending,
  getTasksFulfilled,
  getTasksRejected,
  deleteTasksPending,
  deleteTasksFulfilled,
  deleteTasksRejected
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
