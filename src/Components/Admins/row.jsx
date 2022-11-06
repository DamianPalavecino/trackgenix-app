import React, { useState } from 'react';
import DeleteButton from './deleteButton';
import Modal from './modalDelete';

const Row = ({ admin, deleteAdmin }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <tr>
      <td>{admin.name}</td>
      <td>{admin.lastName}</td>
      <td>{admin.email}</td>
      <td>{admin.status ? 'active' : 'inactive'}</td>
      <td>
        <DeleteButton openModal={openModal} />
        <Modal
          admin={admin}
          closeModal={closeModal}
          showModal={showModal}
          deleteAdmin={deleteAdmin}
        />
        <button
          onClick={() => {
            window.location.assign(`admins/form?id=${admin._id}`);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default Row;
