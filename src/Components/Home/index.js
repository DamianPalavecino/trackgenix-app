import { Button } from 'Components/Shared/';
import styles from './home.module.css';
import Layout from 'Components/Layout';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  return (
    <Layout routes={[]}>
      <section className={styles.container}>
        <h2>Home</h2>
        <Button text="Login pa" variant="addButton" onClick={() => history.push(`/auth/login`)} />
      </section>
    </Layout>
  );
}

export default Home;
