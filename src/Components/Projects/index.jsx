import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import { Table, Spinner, Button, Modal, Select, Input } from 'Components/Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, deleteProject, assignEmployee } from 'redux/projects/thunks';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getEmployees } from 'redux/employees/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeSchema } from './validations';

const Projects = () => {
  const [showModal, setShowModal] = useState({
    confirm: false,
    success: false,
    employees: false,
    assign: false
  });
  const [employees, saveEmployees] = useState([]);
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { list: projectsList, isPending, message } = useSelector((state) => state.projects);
  const { list: employeeList } = useSelector((state) => state.employees);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(employeeSchema)
  });

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
    toggleModal('confirm', 'success');
    history.goBack();
  };

  const toggleModal = (modal, secondModal) => {
    if (secondModal) {
      setShowModal({
        ...showModal,
        [modal]: !showModal[modal],
        [secondModal]: !secondModal[modal]
      });
    } else {
      setShowModal({
        ...showModal,
        [modal]: !showModal[modal]
      });
    }
  };

  const openDeleteModal = (id) => {
    history.push(`projects/delete/${id}`);
    toggleModal('confirm');
  };

  const editRow = (id) => {
    history.push(`projects/form/${id}`);
  };

  const showEmployeesModal = (id) => {
    history.push(`projects/${id}/employees`);
    toggleModal('employees');
    const data = projectsList.find((project) => project._id === id);
    saveEmployees(
      data.employees.map((employee) => {
        return {
          ...employee.employeeId,
          rate: employee.rate,
          role: employee.role
        };
      })
    );
  };

  const showAssignEmployeeModal = (id) => {
    history.push(`/admin/projects/${id}/assign`);
    toggleModal('assign');
  };

  const onSubmit = async (employee) => {
    const response = await dispatch(assignEmployee(params.id, employee));
    if (response.type === 'ASSIGN_EMPLOYEE_FULFILLED') {
      toggleModal('assign', 'success');
    } else if (response.type === 'ASSIGN_EMPLOYEE_REJECTED') {
      toggleModal('assign', 'error');
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => {
          toggleModal('confirm');
          history.goBack();
        }}
        title="Are you sure?"
        text="Do you really want to delete this project?
        This process cannot be undone."
      >
        <span>
          <Button
            onClick={() => {
              toggleModal('confirm');
              history.goBack();
            }}
            variant={'cancelButton'}
            text="No"
          />
          <Button
            onClick={() => {
              handleDelete(params.id);
            }}
            text="Yes"
            variant={'confirmButton'}
          />
        </span>
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => {
          toggleModal('success');
          history.goBack();
        }}
        text={'Project deleted successfullly'}
        variant={'successModal'}
      />
      <Modal
        showModal={showModal.error}
        variant={'errorModal'}
        closeModal={() => {
          toggleModal('error');
          history.goBack();
        }}
        text={message}
      ></Modal>
      <Modal
        showModal={showModal.employees}
        closeModal={() => {
          toggleModal('employees');
          history.goBack();
        }}
        title="Employees List"
      >
        {employees.length > 0 ? (
          <Table headers={['name', 'lastName', 'email', 'rate', 'role']} data={employees} />
        ) : (
          <p>There are no employees in this project</p>
        )}
      </Modal>
      <Modal
        showModal={showModal.assign}
        closeModal={() => {
          toggleModal('assign');
          history.goBack();
        }}
        title="Assign Employee to Project"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            label="Employee"
            name="employeeId"
            optionsData={employeeList}
            item="lastName"
            optionValue="Employee"
            register={register}
            error={errors.employeeId?.message}
          />
          <Select
            label="Role"
            name="role"
            register={register}
            optionValue="Role"
            error={errors.role?.message}
          >
            <option value="DEV">Developer</option>
            <option value="QA">Quality Assurance</option>
            <option value="TL">Tech Lead</option>
            <option value="PM">Project Manager</option>
          </Select>
          <Input
            label="Rate"
            type="number"
            placeholder="Rate"
            register={register}
            name="rate"
            error={errors.rate?.message}
          />
          <div>
            <Button
              variant={'cancelButton'}
              text="Back"
              onClick={() => {
                toggleModal('assign');
                history.goBack();
              }}
            />
            <Button type="submit" variant="addButton" text="Assign" />
          </div>
        </form>
      </Modal>
      <h2>Projects</h2>
      <Button
        text="Add Project +"
        variant="addButton"
        onClick={() => history.push('projects/form')}
      />
      {isPending ? (
        <Spinner entity="Projects" />
      ) : (
        <Table
          headers={[
            'name',
            'startDate',
            'endDate',
            'description',
            'clientName',
            'employees',
            'status',
            'actions'
          ]}
          data={projectsList}
          handleDelete={openDeleteModal}
          editItem={editRow}
          showInfo={showEmployeesModal}
          assignEmployee={showAssignEmployeeModal}
        />
      )}
    </div>
  );
};

export default Projects;
