import styles from './admins.module.css';
import { useEffect, useState } from 'react';
import AddAdmin from './addAdmins/AddAdmin';

function Admins() {
  const [admins, saveAdmins] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);

  const deleteAdmin = (adminId) => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
      method: 'DELETE'
    });
    const updatedAdminList = admins.filter((admin) => admin._id !== adminId);
    saveAdmins(updatedAdminList);
  };

  return (
    <section className={styles.container}>
      <AddAdmin AddAdmin={AddAdmin} />
      <h2>Admin list</h2>
      <table>
        <thead>
          <tr>
            <th id="name">Name</th>
            <th id="lastName">Last Name</th>
            <th id="email">Email Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr key={admin._id}>
                <td key={admin.name}>{admin.name}</td>
                <td key={admin.lastName}>{admin.lastName}</td>
                <td key={admin.email}>{admin.email}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteAdmin(admin._id);
                    }}
                  >
                    delete
                  </button>
                </td>
                <td>
                  <button>edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Admins;
