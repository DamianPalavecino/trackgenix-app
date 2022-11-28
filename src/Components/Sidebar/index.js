import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = (props) => {
  return (
    <aside className={styles.side}>
      <ul className={styles.ul}>
        {props.routes.routes.map((route) => (
          <li className={styles.li} key={route.name}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
