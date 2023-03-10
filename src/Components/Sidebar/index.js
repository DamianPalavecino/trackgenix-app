import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'Components/Shared';
import { logout } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';

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
      <div className={styles.divSidebarStatic}>
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
              <div className={styles.liIcon}>
                <a
                  onClick={() => {
                    dispatch(logout());
                    toggleModal('success');
                  }}
                  className={styles.awesomeSidebar}
                >
                  Logout
                </a>
                <div>
                  <a>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
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
                <a
                  onClick={() => {
                    dispatch(logout());
                    toggleModal('success');
                  }}
                  className={styles.awesomeSidebar}
                >
                  Logout
                </a>
                <div>
                  <a>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </a>
                </div>
              </div>
            )}
          </ul>
        </div>
      )}
      <a onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <a className={styles.awesomeCloseMenu}>
            <FontAwesomeIcon icon={faRectangleXmark} />
          </a>
        ) : (
          <a className={styles.awesomeMenu}>
            <FontAwesomeIcon icon={faBars} />
          </a>
        )}
      </a>
    </div>
  );
};

export default Sidebar;
