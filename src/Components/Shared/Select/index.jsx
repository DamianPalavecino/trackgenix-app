import styles from './select.module.css';

const Select = ({
  selectName,
  selectValue,
  label,
  optionValue,
  error,
  optionsData,
  onChange,
  item,
  children,
  register,
  registerName
}) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className={styles.divSelect}>
      <label>{label}</label>
      <select
        className={styles.select}
        name={selectName || ''}
        value={selectValue || ''}
        onChange={(e) => handleChange(e)}
        {...register(registerName)}
      >
        <option selected disabled value="">
          Select {optionValue}
        </option>
        {optionsData &&
          optionsData.map((row) => {
            return (
              <option value={row._id} key={row._id}>
                {row[item]}
              </option>
            );
          })}
        {children}
      </select>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Select;
