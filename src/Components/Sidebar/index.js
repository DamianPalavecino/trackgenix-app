import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'Components/Shared';
import { logout } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState({ success: false });
  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.sidebarContainer}>
      <Modal
        showModal={showModal.success}
        variant="successModal"
        closeModal={() => {
          toggleModal('success');
          history.push('/');
        }}
        title="You have logged out"
        text={'Redirecting to home page...'}
      ></Modal>
      {isOpen && (
        <div className={styles.divSidebar}>
          <ul className={styles.ul}>
            {props?.routes?.routes?.map((route) => (
              <li className={styles.li} key={route.name}>
                <Link to={route.path} onClick={props.onClick}>
                  {route.name}
                </Link>
              </li>
            ))}
            {authenticated && (
              <div className={styles.li}>
                <Button
                  onClick={() => {
                    dispatch(logout());
                    toggleModal('success');
                  }}
                  text="Logout"
                />
              </div>
            )}
          </ul>
        </div>
      )}
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <div className={styles.hamburger}>
            <span className={styles.closeButton}>X</span>
          </div>
        ) : (
          <div className={styles.hamburger}>
            <div className={styles._layer}></div>
            <div className={styles._layer}></div>
            <div className={styles._layer}></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
