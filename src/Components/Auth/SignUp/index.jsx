import React from 'react';
import Layout from 'Components/Layout';

const SignUp = () => {
  return (
    <Layout routes={[{ name: 'Login', path: '/auth/login' }]}>
      <div>
        <h1>SignUp</h1>
      </div>
    </Layout>
  );
};

export default SignUp;
