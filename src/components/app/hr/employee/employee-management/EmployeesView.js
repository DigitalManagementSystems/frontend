import React from 'react';
import PropTypes from 'prop-types';
import { employeesProp } from './PropTypes';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import AddIcon from '@material-ui/icons/Add';
import Styles from './Styles';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { withTranslation } from 'react-i18next';

const EmployeesView = ({ t, employees, onCreateEmployeeClick, onEmployeeClick }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox checked={false} />
                </TableCell>
                <TableCell>{t('employeeName.title')}</TableCell>
                <TableCell>{t('employeePreferredName.title')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox checked={false} />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <Link className={classes.link} onClick={() => onEmployeeClick(employee.id)}>
                      {employee.name.firstName + employee.name.middleName + employee.name.lastName}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    {employee.name.preferredName}
                  </TableCell>
                </TableRow>
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
