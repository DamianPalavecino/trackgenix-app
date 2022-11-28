import { loginRejected, loginPending, logoutRejected, logoutPending } from './actions';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'Components/Helpers/firebase';

export const login = (inputData) => {
  return async (dispatch) => {
    dispatch(loginPending());
    console.log('esto es una prueba');
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
      return role;
    } catch (error) {
      return dispatch(loginRejected());
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
