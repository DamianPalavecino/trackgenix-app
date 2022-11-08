import styles from './table.module.css';
import Row from '../Row';

const Table = ({ headers, data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <Row data={data} />
      </tbody>
    </table>
  );
};

export default Table;
