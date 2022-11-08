import Button from '../Button';
import styles from './row.module.css';

const Row = ({ data, headers, handleDelete, editItem, showInfo }) => {
  return (
    <>
      {data.map((row) => {
        return (
          <tr className={styles.row} key={row._id}>
            {headers.map((header, index) => {
              if (header === 'actions') {
                return (
                  <td className={styles.td} key={index}>
                    <Button onClick={editItem} text="Edit" variant="editButton" />
                    <Button onClick={handleDelete} text="Delete" variant="confirmButton" />
                  </td>
                );
              }
              if (Array.isArray(row[header])) {
                return (
                  <td key={index}>
                    <Button onClick={showInfo} text={header} />
                  </td>
                );
              } else {
                return <td key={index}>{row[header]}</td>;
              }
            })}
          </tr>
        );
      })}
    </>
  );
};

export default Row;
