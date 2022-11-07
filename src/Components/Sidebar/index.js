import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <section className={styles.container}>
    <ul className={styles.routes}>
      <li>
        <Link to="/">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/home.svg`} />
          Home
        </Link>
      </li>
      <li>
        <Link to="/admins">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          Admins
        </Link>
      </li>
      <li>
        <Link to="/super-admins">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          Super Admins
        </Link>
      </li>
      <li>
        <Link to="/projects">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          Projects
        </Link>
      </li>
      <li>
        <Link to="time-sheets">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          Timesheets
        </Link>
      </li>
      <li>
        <Link to="/tasks">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          Tasks
        </Link>
      </li>
    </ul>
    <ul className={styles.routes}>
      <li>
        <Link to="/">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/logout.svg`} />
          Logout
        </Link>
      </li>
    </ul>
  </section>
);

export default Sidebar;

/*{
</nav><nav className={styles.navbar}>
<div className={styles.appName}>
  Track<span>GENIX</span>
</div>

</nav></></>
</header> */
