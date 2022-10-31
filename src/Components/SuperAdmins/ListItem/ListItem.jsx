import React from 'react';
import './listItem.module.css';

const ListItem = ({ admin }) => {
  const status = admin.status ? 'true' : 'false';
  return (
    <tr>
      <td>{admin.name}</td>
      <td>{admin.lastName}</td>
      <td>{admin.email}</td>
      <td>{status}</td>
    </tr>
  );
};

export default ListItem;
