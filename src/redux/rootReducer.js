import { combineReducers } from 'redux';
import adminReducer from './admins/reducer';
import projectsReducer from './projects/reducer';
import superAdminReducer from './super-admins/reducer';
import tasksReducer from './tasks/reducer';
import employeesReducer from './employees/reducer';
import timeSheetReducer from './timesheets/reducer';

const reducer = combineReducers({
  admins: adminReducer,
  tasks: tasksReducer,
  superAdmins: superAdminReducer,
  employees: employeesReducer,
  projects: projectsReducer,
  timeSheets: timeSheetReducer
});

export default reducer;
