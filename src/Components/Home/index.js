import { Button } from 'Components/Shared/';
import styles from './home.module.css';
import Layout from 'Components/Layout';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const history = useHistory();
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <Layout routes={[]}>
      <section className={styles.container}>
        <h2>Home</h2>
        {!authenticated && (
          <Button text="Login" variant="addButton" onClick={() => history.push(`/auth/login`)} />
        )}
      </section>
    </Layout>
  );
}

export default Home;
