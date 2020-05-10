import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withTranslation } from 'react-i18next';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';

import Styles from './Styles';
import EmployeeTableHeader from './EmployeeTableHeader';
import EmployeeView from './EmployeeView';

export const EmployeesView = ({ t, user, onCreateEmployeeClick, onEmployeeClick }) => {
  const classes = Styles();
  const employees = user.manufacturers.edges[0].node.employees;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <EmployeeTableHeader />
            <TableBody>
              {employees.edges.map(({ node }) => (
                <EmployeeView key={node.id} employee={node} onEmployeeClick={onEmployeeClick} />
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
  onCreateEmployeeClick: PropTypes.func.isRequired,
  onEmployeeClick: PropTypes.func.isRequired,
};

export default createFragmentContainer(withTranslation()(EmployeesView), {
  user: graphql`
    fragment EmployeesView_user on User {
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            employees(first: 1000) @connection(key: "User_employees") {
              edges {
                node {
                  id
                  ...EmployeeView_employee
                }
              }
            }
          }
        }
      }
    }
  `,
});
