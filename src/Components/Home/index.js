import { Button } from 'Components/Shared/';
import styles from './home.module.css';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <Button
        text="Go to employee home"
        variant="addButton"
        onClick={() => history.push('/employees/home')}
      />
    </section>
  );
}

export default Home;
