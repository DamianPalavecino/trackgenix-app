import React from 'react';
import { useEffect, useState } from 'react';
import Table from '../Shared/Table';

function SuperAdmins() {
  const [admins, adminsList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/superAdmins`)
      .then((response) => response.json())
      .then((response) => {
        adminsList(response.data);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${id}`, {
      method: 'DELETE'
    });
    adminsList([...admins.filter((admins) => admins._id !== id)]);
  };

  return (
    <Table
      data={admins}
      headers={['name', 'lastName', 'email', 'actions']}
      handleDelete={handleDelete}
    />
  );
}

export default SuperAdmins;
