import React from 'react';
import styles from './button.module.css';

const Button = ({ modalOpen }) => {
  return (
    <button onClick={modalOpen} className={styles.button}>
      X
    </button>
  );
};

export default Button;
