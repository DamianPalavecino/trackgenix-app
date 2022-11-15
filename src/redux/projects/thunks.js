import {
  getProjectsPending,
  getProjectsFulfilled,
  getProjectsRejected,
  postProjectsPending,
  postProjectsFulfilled,
  postProjectsRejected,
  putProjectsPending,
  putProjectsFulfilled,
  putProjectsRejected
} from './actions';

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

export const postProjects = (newProject) => {
  return async (dispatch) => {
    try {
      dispatch(postProjectsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postProjectsFulfilled(data.message));
      } else {
        dispatch(postProjectsRejected(data.message));
      }
    } catch (error) {
      dispatch(postProjectsRejected(error.toString()));
    }
  };
};

export const putProjects = (id, editedProject) => {
  return async (dispatch) => {
    try {
      dispatch(putProjectsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedProject)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putProjectsFulfilled(data.message));
      } else {
        dispatch(putProjectsRejected(data.message));
      }
    } catch (error) {
      dispatch(putProjectsRejected(error.toString()));
    }
  };
};
