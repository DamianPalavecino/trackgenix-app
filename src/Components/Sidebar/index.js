import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <section className={styles.container}>
    <ul className={styles.routes}>
      <li>
        <Link to="/">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/home.svg`} />
          <h2>Home</h2>
        </Link>
      </li>
      <li>
        <Link to="/admins">
          <h2>Admins</h2>
        </Link>
      </li>
      <li>
        <Link to="/super-admins">
          <h2>Super Admins</h2>
        </Link>
      </li>
      <li>
        <Link to="/employees">
          <h2>Employees</h2>
        </Link>
      </li>
      <li>
        <Link to="/projects">
          <h2>Projects</h2>
        </Link>
      </li>
      <li>
        <Link to="time-sheets">
          <h2>Timesheets</h2>
        </Link>
      </li>
      <li>
        <Link to="/tasks">
          <h2>Tasks</h2>
        </Link>
      </li>
    </ul>
  </section>
);

export default Sidebar;
