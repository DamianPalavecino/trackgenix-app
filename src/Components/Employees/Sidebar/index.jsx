import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.side}>
      <ul>
        <li className={styles.li}>
          <Link to="/employees/home">Projects</Link>
        </li>
        <li className={styles.li}>
          <Link to="/employees/timesheets">Timesheets</Link>
        </li>
        <li className={styles.li}>
          <Link to="/employees/profile">Profile</Link>
        </li>
        <Link to="/home">Back to general Home</Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
