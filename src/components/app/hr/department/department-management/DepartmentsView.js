import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { departmentsProp } from './PropTypes';
import Styles from './Styles';
import DepartmentsTableHeader from './DepartmentsTableHeader';
import DepartmentView from './DepartmentView';

const DepartmentsView = ({ departments, onCreateDepartmentClick, onDepartmentClick }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <DepartmentsTableHeader />
            <TableBody>
              {departments.map((department) => (
                <DepartmentView key={department.id} department={department} onDepartmentClick={onDepartmentClick} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateDepartmentClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

DepartmentsView.propTypes = {
  departments: departmentsProp.isRequired,
  onCreateDepartmentClick: PropTypes.func.isRequired,
  onDepartmentClick: PropTypes.func.isRequired,
};

export default DepartmentsView;
