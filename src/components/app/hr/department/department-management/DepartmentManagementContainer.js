import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { userDepartments } from './PropTypes';
import DepartmentsView from './DepartmentsView';

export class DepartmentsContainer extends Component {
  createDepartment = () => {
    const { history } = this.props;

    history.push('/hr/create-department');
  };

  handleDepartmentClick = (id) => {
    const { history } = this.props;
    const linkToDepartment = `/hr/departments/${id}`;

    history.push(linkToDepartment);
  };

  render = () => (
    <DepartmentsView
      departments={this.props.user.departments.edges.map((edge) => edge.node)}
      onCreateDepartmentClick={this.createDepartment}
      onDepartmentClick={this.handleDepartmentClick}
    />
  );
}

DepartmentsContainer.propTypes = {
  user: userDepartments.isRequired,
};

export default withRouter(DepartmentsContainer);
