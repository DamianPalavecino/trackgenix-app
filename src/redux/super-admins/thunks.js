import {
  getAdminsPending,
  getAdminsFulfilled,
  getAdminsRejected,
  deleteAdminsPending,
  // deleteAdminsFulfilled,
  deleteAdminsRejected,
  deleteAdminsFulfilled
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
