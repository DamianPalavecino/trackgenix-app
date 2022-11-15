import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Shared/Modal/Modal';
import Button from '../../Shared/Button';
import { getAdminsById, postAdmins, putAdmins } from '../../../redux/super-admins/thunks';

const Form = () => {
  const [input, setInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    status: ''
  });

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { message, status, request, list } = useSelector((state) => state.superAdmins);
  const idAdmin = params.id;
  const [showModal, setShowModal] = useState({ error: false, success: false });

  useEffect(async () => {
    if (idAdmin) {
      dispatch(getAdminsById(idAdmin));
    }
  }, []);

  useEffect(() => {
    if (request === 'GETBYID') {
      setInput({
        name: list.name,
        lastName: list.lastName,
        email: list.email,
        password: list.password,
        status: list.status
      });
    }
  }, [list]);

  useEffect(() => {
    if (request === 'POST' || request === 'PUT') {
      toggleModal(status);
    }
  }, [status]);

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    history.push('/super-admins');
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = () => {
    if (idAdmin) {
      dispatch(putAdmins(idAdmin, input));
    } else {
      input.status = false;
      dispatch(postAdmins(input));
    }
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.error}
        closeModal={() => toggleModal('error')}
        text={message}
        variant="errorModal"
      />
      <Modal
        showModal={showModal.success}
        closeModal={() => {
          toggleModal('success');
          redirect();
        }}
        text={message}
        variant="successModal"
      />
      <h2>{idAdmin ? 'Edit' : 'Create'} Admin</h2>
      <form className={styles.form}>
        <div className={styles.div}>
          <label className={styles.label}>First Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={input.name}
            onChange={onChangeInput}
          />
          <label className={styles.label}>Last Name</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={input.lastName}
            onChange={onChangeInput}
          />
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="text"
            name="email"
            value={input.email}
            onChange={onChangeInput}
          />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={input.password}
            onChange={onChangeInput}
          />
          {idAdmin ? (
            <>
              <label className={styles.label}>Status</label>
              <select name="status" onChange={onChangeInput} className={styles.select}>
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
              </select>
            </>
          ) : null}
          <div>
            <Button text="Back" onClick={redirect} />
            <Button
              variant={idAdmin ? 'editButton' : 'addButton'}
              text={idAdmin ? 'Edit' : 'Create'}
              onClick={onSubmit}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
