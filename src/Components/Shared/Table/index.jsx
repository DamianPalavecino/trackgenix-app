import Row from '../Row';
import styles from './table.module.css';

const Table = ({ headers, data, handleDelete, editItem, showInfo, assignEmployee }) => {
  function insertSpace(s) {
    return s
      .split('')
      .map((c, i, arr) => {
        if (i > 0 && c.toUpperCase() === c && arr[i - 1].toLowerCase() === arr[i - 1]) {
          return ' ' + c;
        }
        return c;
      })
      .join('');
  }

  return (
    <div className={styles.divTable}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{insertSpace(header)}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => {
              return (
                <Row
                  key={item._id}
                  data={item}
                  headers={headers}
                  handleDelete={handleDelete}
                  editItem={editItem}
                  showInfo={showInfo}
                  assignEmployee={assignEmployee}
                />
              );
            })
          ) : (
            <p className={styles.noData}>There is no data available</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
