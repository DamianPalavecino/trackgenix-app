import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.logos}>
        <a
          href={'https://www.linkedin.com/company/radium-rocket/'}
          target={'_blank'}
          rel="noreferrer"
        >
          Icon
        </a>
        <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          Icon
        </a>
        <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
          Icon
        </a>
        <a href="https://twitter.com/radiumrocket" target={'_blank'} rel="noreferrer">
          Icon
        </a>
        <a href="https://github.com/radiumrocketapps" target={'_blank'} rel="noreferrer">
          Icon
        </a>
      </div>
      <div className={styles.copyright}>Rosario, Argentina</div>
      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} Radium Rocket. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
