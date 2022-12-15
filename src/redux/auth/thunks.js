import {
  loginRejected,
  loginPending,
  logoutRejected,
  logoutPending,
  loginFulfilled,
  getUserProfilePending,
  getUserProfileFulfilled,
  getUserProfileRejected
} from './actions';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'helpers/firebase';

export const login = (inputData) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const userCredencials = await signInWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );
      const {
        token,
        claims: { role }
      } = await userCredencials.user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      dispatch(getUserProfile());
      return dispatch(loginFulfilled(role));
    } catch (error) {
      return dispatch(loginRejected(error.message));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    return signOut(auth)
      .then(() => {
        sessionStorage.clear();
      })
      .catch((error) => {
        return dispatch(logoutRejected(error.toString()));
      });
  };
};

export const getUserProfile = () => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(getUserProfilePending());
    fetch(`${process.env.REACT_APP_API_URL}/auth/getUserProfile`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getUserProfileFulfilled(response.data));
        }
      })
      .catch((error) => dispatch(getUserProfileRejected(error.message)));
  };
};
