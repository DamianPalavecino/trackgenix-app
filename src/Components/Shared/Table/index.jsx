import styles from './table.module.css';
import Row from '../Row';

const Table = ({ headers, data, handleDelete }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return (
              <th key={index} className={styles.tableHeader}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        <Row data={data} headers={headers} handleDelete={handleDelete} />
      </tbody>
    </table>
  );
};

export default Table;
