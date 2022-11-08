import Button from '../Button';
import styles from './row.module.css';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { useState } from 'react';

const Row = ({ data, headers, handleDelete }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState({ info: false, delete: false, success: false });
  const [showArray, setShowArray] = useState([]);
  const [id, setId] = useState('');

  const edit = (id) => {
    history.push(`/super-admins/form/${id}`);
  };

  const toggleModal = (modal, secondModal) => {
    if (secondModal) {
      setShowModal({
        ...showModal,
        [modal]: !showModal[modal],
        [secondModal]: !secondModal[modal]
      });
    } else {
      setShowModal({
        ...showModal,
        [modal]: !showModal[modal]
      });
    }
  };

  return (
    <>
      <Modal
        text="Deleted successfully"
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
      />
      <Modal showModal={showModal.info} closeModal={() => toggleModal('info')}>
        {showArray.map((row) => {
          console.log(row);
          return Object.keys(row).map((data, index) => {
            return (
              <table key={index}>
                <tr>
                  {data !== ('employeeId' || 'projectId') ? data + ':' : ''}
                  <td>{data !== ('employeeId' || 'projectId') ? row[data] : ''}</td>
                </tr>
              </table>
            );
          });
        })}
      </Modal>
      <Modal
        title="Are you sure?"
        text="You are going to delete the row"
        showModal={showModal.delete}
        closeModal={() => toggleModal('delete')}
      >
        <Button
          variant="confirmButton"
          text="Yes"
          onClick={() => {
            handleDelete(id);
            toggleModal('delete', 'success');
          }}
        />
        <Button text="Cancel" onClick={() => toggleModal('delete')} />
      </Modal>
      {data.map((row) => {
        return (
          <tr className={styles.row} key={row._id}>
            {headers.map((header, index) => {
              if (header === 'actions') {
                return (
                  <td className={styles.td} key={index}>
                    <Button text="Edit" variant="editButton" onClick={() => edit(row._id)} />
                    <Button
                      text="Delete"
                      variant="confirmButton"
                      onClick={() => {
                        toggleModal('delete');
                        setId(row._id);
                      }}
                    />
                  </td>
                );
              }
              if (Array.isArray(row[header])) {
                return (
                  <td key={index}>
                    <Button
                      text={header}
                      onClick={() => {
                        setShowArray(row[header]);
                        toggleModal('info');
                      }}
                    />
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
