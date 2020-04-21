import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { userEmployees } from './PropTypes';
import EmployeesView from './EmployeesView';

export class EmployeesContainer extends Component {
  createEmployee = () => {
    const { history } = this.props;

    history.push('/hr/create-employee');
  };

  handleEmployeeClick = (id) => {
    const { history } = this.props;
    const linkToEmployee = `/hr/employees/${id}`;

    history.push(linkToEmployee);
  };

  render = () => (
    <EmployeesView
      employees={this.props.user.employees.edges.map((edge) => edge.node)}
      onCreateEmployeeClick={this.createEmployee}
      onEmployeeClick={this.handleEmployeeClick}
    />
  );
}

EmployeesContainer.propTypes = {
  user: userEmployees.isRequired,
};

export default withRouter(EmployeesContainer);
