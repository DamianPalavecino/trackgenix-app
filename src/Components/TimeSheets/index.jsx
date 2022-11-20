import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import styles from './time-sheets.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/Modal';
import Spinner from '../Shared/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets, deleteTimesheets } from '../../redux/timesheets/thunks';
import { useHistory, useParams } from 'react-router-dom';

const TimeSheets = () => {
  const [showModal, setShowModal] = useState({ confirm: false, success: false });
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { list: timesheetsList, isPending } = useSelector((state) => state.timeSheets);

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteTimesheets(id));
    toggleModal('confirm', 'success');
    history.push('/time-sheets');
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

  const openDeleteModal = (id) => {
    history.push(`time-sheets/delete/${id}`);
    toggleModal('confirm');
  };

  const editRow = (id) => {
    history.push(`time-sheets/form/${id}`);
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => {
          toggleModal('confirm');
          history.goBack();
        }}
        title="Are you sure?"
        text="Do you really want to delete this timesheet?
        This process cannot be undone."
      >
        <span>
          <Button
            onClick={() => {
              toggleModal('confirm');
              history.goBack();
            }}
            variant={'cancelButton'}
            text="No"
          />
          <Button
            onClick={() => {
              handleDelete(params.id);
            }}
            text="Yes"
            variant={'confirmButton'}
          />
        </span>
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Timesheet deleted successfully"
        variant={'successModal'}
      />
      <h2>Timesheets</h2>
      <Button
        text="Add Timesheet +"
        variant="addButton"
        onClick={() => history.push('/time-sheets/form')}
      />
      {isPending ? (
        <Spinner entity="Timesheets" />
      ) : (
        <Table
          headers={['date', 'description', 'hours', 'project', 'task', 'actions']}
          data={timesheetsList}
          handleDelete={openDeleteModal}
          editItem={editRow}
        />
      )}
    </div>
  );
};

export default TimeSheets;
