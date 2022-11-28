import Header from 'Components/Header';
import Sidebar from 'Components/Sidebar';
import Footer from 'Components/Footer';
import styles from './layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Sidebar routes={props} />
        <div className={styles.content}>{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
