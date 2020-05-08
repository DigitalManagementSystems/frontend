import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { departmentsProp } from './PropTypes';
import Styles from './Styles';
import DepartmentsTableHeader from './DepartmentsTableHeader';
import DepartmentView from './DepartmentView';

export const DepartmentsView = ({ user, onCreateDepartmentClick, onDepartmentClick }) => {
  const classes = Styles();
  const departments = user.manufacturers.edges[0].node.departments;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <DepartmentsTableHeader />
            <TableBody>
              {departments.edges
                .map((edge) => edge.node)
                .map((node) => (
                  <DepartmentView key={node.id} department={node} onDepartmentClick={onDepartmentClick} />
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

export default createFragmentContainer(DepartmentsView, {
  user: graphql`
    fragment DepartmentsView_user on User {
      id
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            departments(first: 1000) @connection(key: "User_departments") {
              edges {
                node {
                  id
                  ...DepartmentView_department
                }
              }
            }
          }
        }
      }
    }
  `,
});
