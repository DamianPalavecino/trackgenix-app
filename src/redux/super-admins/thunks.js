import {
  getAdminsPending,
  getAdminsFulfilled,
  getAdminsRejected,
  getByIdAdminsPending,
  getByIdAdminsFulfilled,
  getByIdAdminsRejected,
  deleteAdminsPending,
  deleteAdminsFulfilled,
  deleteAdminsRejected,
  postAdminsPending,
  postAdminsFulfilled,
  postAdminsRejected,
  putAdminsPending,
  putAdminsFulfilled,
  putAdminsRejected
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/admins`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getAdminsFulfilled(response.data));
        }
      })
      .catch((error) => {
        dispatch(getAdminsRejected(error.toString()));
      });
  };
};

export const getAdminsById = (id) => {
  return async (dispatch) => {
    dispatch(getByIdAdminsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.data);
        } else {
          dispatch(getByIdAdminsFulfilled(response.data));
        }
      })
      .catch((error) => {
        dispatch(getByIdAdminsRejected(error.toString()));
      });
  };
};

export const deleteAdmins = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteAdminsFulfilled(id));
        }
      })
      .catch((error) => {
        dispatch(deleteAdminsRejected(error.toString()));
      });
  };
};

export const postAdmins = (newAdmin) => {
  return async (dispatch) => {
    try {
      dispatch(postAdminsPending());
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(newAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(postAdminsFulfilled(data.message));
      } else {
        return dispatch(postAdminsRejected(data.message));
      }
    } catch (error) {
      return dispatch(postAdminsRejected(error.toString()));
    }
  };
};

export const putAdmins = (id, editedAdmin) => {
  return async (dispatch) => {
    try {
      dispatch(putAdminsPending());
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(editedAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(putAdminsFulfilled(data.message));
      } else {
        return dispatch(putAdminsRejected(data.message));
      }
    } catch (error) {
      return dispatch(putAdminsRejected(error.toString()));
    }
  };
};
