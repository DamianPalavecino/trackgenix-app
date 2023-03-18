import styles from './row.module.css';
import { useSelector } from 'react-redux';

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
              <div className={styles.divActions}>
                <div className={styles.actionsDiv}>
                  <a
                    onClick={() => {
                      handleDelete(data._id);
                    }}
                    className={styles.awesomeAction}
                  >
                    Icon
                  </a>
                </div>
                <div className={styles.actionsDiv}>
                  <a onClick={() => editItem(data._id)} className={styles.awesomeAction}>
                    Icon
                  </a>
                </div>
                {data['employees'] && (
                  <div className={styles.actionsDiv}>
                    <a onClick={() => assignEmployee(data._id)} className={styles.awesomeAction}>
                      Icon
                    </a>
                  </div>
                )}
              </div>
            </td>
          );
        }
        if (header === 'action' && authData?.isProjectManager) {
          const foundEmployee = data['employees'].find(
            (employee) => employee.employeeId === authData._id && employee.role === 'PM'
          );
          if (foundEmployee)
            return (
              <a onClick={() => editItem(data._id)} className={styles.awesomeActionEdit}>
                Icon
              </a>
            );
        }
        if (role === 'EMPLOYEE' && header === 'role') {
          const findEmployee = data.employees.find(
            (employee) => employee.employeeId === authData._id
          );
          return <td key={index}>{findEmployee?.role}</td>;
        }
        if (data[header] && header === 'project') return <td>{data[header].name}</td>;
        if (data[header] && header === 'task') return <td>{data[header].description}</td>;
        if (header.includes('updatedAt') || header.includes('Date') || header.includes('date'))
          return <td key={index}>{data[header] && fixDate(data[header])}</td>;
        if (header === 'status') return <td key={index}>{data[header] ? 'Active' : 'Inactive'}</td>;
        if (Array.isArray(data[header])) {
          return (
            <td key={index}>
              <div className={styles.divActions}>
                <a
                  onClick={() => {
                    showInfo(data._id);
                  }}
                  className={styles.awesomeAction}
                >
                  Icon
                </a>
              </div>
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
