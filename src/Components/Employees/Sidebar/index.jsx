import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = () => {
  const id = '637d055152a6ec59e69a46e3';
  return (
    <aside className={styles.side}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to={`/employees/home/${id}`}>Projects</Link>
        </li>
        <li className={styles.li}>
          <Link to={`/employees/timesheets/${id}`}>Timesheets</Link>
        </li>
        <li className={styles.li}>
          <Link to={`/employees/profile/${id}`}>Profile</Link>
        </li>
        <li className={styles.li}>
          <Link to="/home">Back to general Home</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
