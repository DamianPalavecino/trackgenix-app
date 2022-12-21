import styles from './home.module.css';
import Layout from 'Components/Layout';
import Login from 'Components/Auth/Login';

function Home() {
  return (
    <Layout
      routes={[
        { name: 'SignUp', path: '/auth/signup' },
        { name: 'Login', path: '/auth/login' }
      ]}
    >
      <section className={styles.container}>
        <Login />
      </section>
    </Layout>
  );
}

export default Home;
