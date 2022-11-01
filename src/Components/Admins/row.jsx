import React, { useState } from 'react';
import DeleteButton from './DeleteButton';
import Modal from './ModalDelete';

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
      <td>
        <DeleteButton openModal={openModal} />
        <Modal
          admin={admin}
          closeModal={closeModal}
          showModal={showModal}
          deleteAdmin={deleteAdmin}
        />
        <a href={`admins/form`}>
          <button>Edit</button>
        </a>
      </td>
    </tr>
  );
};

export default Row;
