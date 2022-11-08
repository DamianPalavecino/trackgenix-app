import styles from './table.module.css';
import Row from '../Row';

const Table = ({ headers, data, handleDelete, editItem, showInfo }) => {
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
        {data && data.length > 0 ? (
          <Row
            data={data}
            headers={headers}
            handleDelete={handleDelete}
            editItem={editItem}
            showInfo={showInfo}
          />
        ) : (
          <p className={styles.noData}>There is no data available</p>
        )}
      </tbody>
    </table>
  );
};

export default Table;
