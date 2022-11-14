import React from 'react';
import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import { getEmployees } from '../../redux/employees/thunks';
import { getProjects } from '../../redux/projects/thunks';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Shared/Spinner';

const Admins = () => {
  const [entity, setEntity] = useState('projects');
  const dispatch = useDispatch();
  const { list, isPending, error } = useSelector((state) =>
    entity === 'projects' ? state.projects : state.employees
  );

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  if (error) {
    return (
      <div className={styles.container}>
        <h3>{error}</h3>
      </div>
    );
  }

  const handleEntity = async (entityToSet) => {
    setEntity(entityToSet);
    entityToSet === 'projects' ? dispatch(getProjects()) : dispatch(getEmployees());
  };

  const headers =
    entity === 'projects'
      ? ['name', 'description', 'clientName', 'status', 'startDate', 'endDate']
      : ['name', 'lastName', 'email'];

  return (
    <section className={styles.container}>
      <div className={styles.selectEntity}>
        <Button text="Employees" onClick={() => handleEntity('employees')} variant="saveButton" />
        <Button text="Projects" onClick={() => handleEntity('projects')} variant="saveButton" />
      </div>
      <h1 className={styles.title}>{entity}</h1>
      {isPending ? <Spinner entity={entity}></Spinner> : <Table data={list} headers={headers} />}
    </section>
  );
};

export default Admins;
