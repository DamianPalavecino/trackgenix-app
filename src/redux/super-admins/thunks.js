import { getAdminsPending, getAdminsFulfilled, getAdminsRejected } from './actions';

export const getAdmins = () => {
  return (dispatch) => {
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
