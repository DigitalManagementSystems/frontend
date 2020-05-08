import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import DepartmentsView from './DepartmentsView';

export class DepartmentsContainer extends Component {
  createDepartment = () => {
    const { history } = this.props;

    history.push('/hr/department/create');
  };

  handleDepartmentClick = (id) => {
    const { history } = this.props;
    const linkToDepartment = `/hr/departments/${id}`;

    history.push(linkToDepartment);
  };

  render = () => (
    <DepartmentsView user={this.props.user} onCreateDepartmentClick={this.createDepartment} onDepartmentClick={this.handleDepartmentClick} />
  );
}

DepartmentsContainer.propTypes = {};

export default createFragmentContainer(withRouter(DepartmentsContainer), {
  user: graphql`
    fragment DepartmentManagementContainer_user on User {
      id
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            departments(first: 1000) @connection(key: "User_departments") {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
      ...DepartmentsView_user
    }
  `,
});
