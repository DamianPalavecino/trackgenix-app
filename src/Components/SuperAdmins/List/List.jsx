import React from 'react';
import ListItem from '../ListItem/ListItem';
import './list.module.css';

const List = ({ list }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((admin) => {
            return <ListItem key={admin._id} admin={admin} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
