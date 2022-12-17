import styles from './row.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faUserPlus, faEye } from '@fortawesome/free-solid-svg-icons';

const Row = ({ data, headers, handleDelete, editItem, showInfo, assignEmployee }) => {
  const fixDate = (date) => {
    return date.slice(0, 10);
  };
  const { data: authData, role } = useSelector((store) => {
    return store.auth;
  });

  return (
    <tr className={styles.row} key={data._id}>
      {headers.map((header, index) => {
        if (header === 'actions') {
          return (
            <td key={index}>
              <a
                onClick={() => {
                  handleDelete(data._id);
                }}
                className={styles.awesomeAction}
              >
                <FontAwesomeIcon icon={faTrash} />
              </a>
              <a onClick={() => editItem(data._id)} className={styles.awesomeAction}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
              {data['employees'] && (
                <a onClick={() => assignEmployee(data._id)} className={styles.awesomeAction}>
                  <FontAwesomeIcon icon={faUserPlus} />
                </a>
              )}
            </td>
          );
        }
        if (role === 'EMPLOYEE' && header === 'role') {
          const findEmployee = data.employees.find(
            (employee) => employee.employeeId === authData._id
          );
          return <td>{findEmployee?.role}</td>;
        }
        if (data[header] && header === 'project') return <td>{data[header].name}</td>;
        if (data[header] && header === 'task') return <td>{data[header].description}</td>;
        if (header.includes('updatedAt') || header.includes('Date') || header.includes('date'))
          return <td key={index}>{data[header] && fixDate(data[header])}</td>;
        if (header === 'status') return <td key={index}>{data[header] ? 'Active' : 'Inactive'}</td>;
        if (Array.isArray(data[header])) {
          return (
            <td key={index}>
              <a
                onClick={() => {
                  showInfo(data._id);
                }}
                className={styles.awesomeAction}
              >
                <FontAwesomeIcon icon={faEye} />
              </a>
            </td>
          );
        } else {
          return (
            <td className={styles.td} key={index}>
              {data[header]}
            </td>
          );
        }
      })}
    </tr>
  );
};

export default Row;
