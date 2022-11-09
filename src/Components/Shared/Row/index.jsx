import Button from '../Button';
import styles from './row.module.css';

const Row = ({ data, headers, handleDelete, editItem, showInfo }) => {
  return (
    <tr className={styles.row} key={data._id}>
      {headers.map((header, index) => {
        if (header === 'actions') {
          return (
            <td className={styles.td} key={index}>
              <Button onClick={() => editItem(data._id)} text="Edit" variant="editButton" />
              <Button
                onClick={() => handleDelete(data._id)}
                text="Delete"
                variant="confirmButton"
              />
            </td>
          );
        }
        if (Array.isArray(data[header])) {
          return (
            <td key={index}>
              <Button onClick={showInfo} text={header} />
            </td>
          );
        } else {
          return <td key={index}>{data[header]}</td>;
        }
      })}
    </tr>
  );
};

export default Row;
