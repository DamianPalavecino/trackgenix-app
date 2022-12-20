import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import SignUp from 'Components/Auth/SignUp';
import Layout from 'Components/Layout';

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout
      routes={[
        { name: 'SignUp', path: '/auth/signup' },
        { name: 'Login', path: '/auth/login' }
      ]}
    >
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/signup`} component={SignUp} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
