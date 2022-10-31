import React from 'react';
import { useEffect, useState } from 'react';
import List from './List/List';

function SuperAdmins() {
  const [list, adminsList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        adminsList(response.data);
      });
  }, []);

  return <List list={list} adminsList={adminsList} />;
}

export default SuperAdmins;
