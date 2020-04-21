import React from 'react';
import PropTypes from 'prop-types';
import { employeesProp } from './PropTypes';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import { withTranslation } from 'react-i18next';

import Styles from './Styles';
import EmployeesTableHeader from './EmployeesTableHeader';
import EmployeeView from './EmployeeView';

const EmployeesView = ({ t, employees, onCreateEmployeeClick, onEmployeeClick }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <EmployeesTableHeader />
            <TableBody>
              {employees.map((employee) => (
                <EmployeeView key={employee.id} employee={employee} onEmployeeClick={onEmployeeClick} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateEmployeeClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

EmployeesView.propTypes = {
  employees: employeesProp.isRequired,
  onCreateEmployeeClick: PropTypes.func.isRequired,
  onEmployeeClick: PropTypes.func.isRequired,
};

export default withTranslation()(EmployeesView);
