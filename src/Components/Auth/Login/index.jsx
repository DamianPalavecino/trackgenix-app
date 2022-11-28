import Layout from 'Components/Layout';
import React from 'react';

const Login = () => {
  return (
    <Layout routes={[{ name: 'SignUp', path: '/auth/signup' }]}>
      <div>
        <h1>Login</h1>
      </div>
    </Layout>
  );
};

export default Login;
