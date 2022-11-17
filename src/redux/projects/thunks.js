import {
  getProjectsPending,
  getProjectsFulfilled,
  getProjectsRejected,
  postProjectsPending,
  postProjectsFulfilled,
  postProjectsRejected,
  putProjectsPending,
  putProjectsFulfilled,
  putProjectsRejected,
  getByIdProjectPending,
  getByIdProjectFulfilled,
  getByIdProjectRejected,
  deleteProjectPending,
  deleteProjectFulfilled,
  deleteProjectRejected
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(postProjectsFulfilled(data.message));
      } else {
        return dispatch(postProjectsRejected(data.message));
      }
    } catch (error) {
      return dispatch(postProjectsRejected(error.toString()));
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
        return dispatch(putProjectsFulfilled(data.message));
      } else {
        return dispatch(putProjectsRejected(data.message));
      }
    } catch (error) {
      return dispatch(putProjectsRejected(error.toString()));
    }
  };
};

export const getProjectById = (id) => {
  return (dispatch) => {
    dispatch(getByIdProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getByIdProjectFulfilled(response.data));
        }
      })
      .catch((error) => {
        dispatch(getByIdProjectRejected(error.toString()));
      });
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteProjectFulfilled(id));
        }
      })
      .catch((error) => {
        dispatch(deleteProjectRejected(error.toString()));
      });
  };
};
