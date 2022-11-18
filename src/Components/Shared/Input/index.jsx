import React from 'react';
import styles from './input.module.css';

const Input = ({ type, name, placeholder, label, onChange, value, error, register }) => {
  return (
    <div className={styles.divInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        error={error}
        {...register(name)}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;
