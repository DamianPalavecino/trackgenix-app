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
  return (dispatch) => {
    dispatch(postProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProject)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(postProjectsFulfilled(response.message));
        }
      })
      .catch((error) => {
        dispatch(postProjectsRejected(error.toString()));
      });
  };
};

export const putProjects = (id, editedProject) => {
  return (dispatch) => {
    dispatch(putProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedProject)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(putProjectsFulfilled(response.message));
        }
      })
      .catch((error) => {
        dispatch(putProjectsRejected(error.toString()));
      });
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
