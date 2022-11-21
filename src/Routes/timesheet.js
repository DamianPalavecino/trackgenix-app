import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TimeSheets from 'Components/TimeSheets';
import TimeSheetsForm from 'Components/TimeSheets/Form';

const TimeSheet = () => {
  return (
    <Switch>
      <Route exact path={'/time-sheets'} component={TimeSheets} />
      <Route exact path={'/time-sheets/delete/:id'} component={TimeSheets} />
      <Route exact path={'/time-sheets/form'} component={TimeSheetsForm} />
      <Route exact path={'/time-sheets/form/:id'} component={TimeSheetsForm} />
    </Switch>
  );
};

export default TimeSheet;
