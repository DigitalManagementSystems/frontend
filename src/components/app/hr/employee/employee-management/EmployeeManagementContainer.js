import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { rootUserProp } from './PropTypes';
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

  getManufacturer = () => this.props.user.manufacturers.edges[0].node;

  render = () => (
    <EmployeesView
      employees={this.getManufacturer().employees.edges.map((edge) => edge.node)}
      onCreateEmployeeClick={this.createEmployee}
      onEmployeeClick={this.handleEmployeeClick}
    />
  );
}

EmployeeManagementContainer.propTypes = {
  user: rootUserProp.isRequired,
};

export default withRouter(EmployeeManagementContainer);
