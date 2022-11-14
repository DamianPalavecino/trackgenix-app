import { getProjectsPending, getProjectsFulfilled, getProjectsRejected } from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getProjectsFulfilled(response.data));
        }
      })
      .catch((error) => {
        dispatch(getProjectsRejected(error.toString()));
      });
  };
};
