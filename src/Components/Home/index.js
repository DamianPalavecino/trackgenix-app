import { Button } from 'Components/Shared/';
import styles from './home.module.css';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const employeeId = '637d055152a6ec59e69a46e3';
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <Button
        text="Go to employee home"
        variant="addButton"
        onClick={() => history.push(`/employees/home/${employeeId}`)}
      />
    </section>
  );
}

export default Home;
