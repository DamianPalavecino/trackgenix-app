import { Switch, Route } from 'react-router-dom';
import Employees from 'Components/Employees';
import EmployeesForm from 'Components/Employees/Form';
const Employee = () => {
  return (
    <Switch>
      <Route exact path={'/employees'} component={Employees} />
      <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
      <Route exact path={'/employee/:id/projects'} component={Employees} />
      <Route exact path={'/employees/delete/:id'} component={Employees} />
      <Route exact path={'/employees/form'} component={EmployeesForm} />
      <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
    </Switch>
  );
};

export default Employee;
