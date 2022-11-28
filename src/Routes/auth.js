import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import SignUp from 'Components/Auth/SignUp';

// const authRoutes = [{ name: 'Log In', path: '/auth/login' }];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/login`} component={Login} />
      <Route path={`${url}/signup`} component={SignUp} />
      <Redirect to={`${url}/login`} />
    </Switch>
  );
};

export default AuthRoutes;
