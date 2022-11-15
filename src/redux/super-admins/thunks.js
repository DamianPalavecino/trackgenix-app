import {
  getAdminsPending,
  getAdminsFulfilled,
  getAdminsRejected,
  deleteAdminsPending,
  deleteAdminsFulfilled,
  deleteAdminsRejected,
  postAdminsPending,
  postAdminsFulfilled,
  postAdminsRejected
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
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

export const deleteAdmins = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
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
    dispatch(postAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAdmin)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(postAdminsFulfilled(response.message));
        }
      })
      .catch((error) => {
        dispatch(postAdminsRejected(error.toString()));
      });
  };
};
