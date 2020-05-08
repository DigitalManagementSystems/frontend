import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import EmployeesView from './EmployeesView';

export class EmployeeManagementContainer extends Component {
  createEmployee = () => {
    const { history } = this.props;

    history.push('/hr/employee/create');
  };

  handleEmployeeClick = (id) => {
    const { history } = this.props;
    const linkToEmployee = `/hr/employees/${id}`;

    history.push(linkToEmployee);
  };

  render = () => <EmployeesView user={this.props.user} onCreateEmployeeClick={this.createEmployee} onEmployeeClick={this.handleEmployeeClick} />;
}

EmployeeManagementContainer.propTypes = {};

export default createFragmentContainer(withRouter(EmployeeManagementContainer), {
  user: graphql`
    fragment EmployeeManagementContainer_user on User {
      id
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            employees(first: 1000) @connection(key: "User_employees") {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
      ...EmployeesView_user
    }
  `,
});
