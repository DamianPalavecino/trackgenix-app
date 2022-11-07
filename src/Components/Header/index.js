import styles from './header.module.css';

const Header = () => {
  return (
    <section className={styles.container}>
      <div className={styles.brand}>
        <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.container.logo}
            src={`${process.env.PUBLIC_URL}/assets/images/radium.png`}
          />
        </a>
        <div className={styles.appName}>Trackgenix</div>
      </div>
      <div className={styles.headline}></div>
    </section>
  );
};

export default Header;
