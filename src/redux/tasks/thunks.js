import { getTasksPending, getTasksFulfilled, getTasksRejected } from './actions';

export const getTasks = () => {
  return (dispatch) => {
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
