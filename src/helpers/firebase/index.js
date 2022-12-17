import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import store from 'redux/store';
import { loginFulfilled, logoutFulfilled, loginRejected, loginPending } from 'redux/auth/actions';
import { getUserProfile } from 'redux/auth/thunks';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const tokenListener = () => {
  onIdTokenChanged(auth, async (user) => {
    store.dispatch(loginPending());
    if (user) {
      try {
        const {
          token,
          claims: { role }
        } = await user.getIdTokenResult();
        if (token) {
          store.dispatch(loginFulfilled(role));
          sessionStorage.setItem('token', token);
          store.dispatch(getUserProfile());
        }
      } catch (error) {
        return store.dispatch(loginRejected());
      }
    } else {
      return store.dispatch(logoutFulfilled());
    }
  });
};
