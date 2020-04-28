import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { rootUserProp } from './PropTypes';
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

  getManufacturer = () => this.props.user.manufacturers.edges[0].node;

  render = () => (
    <DepartmentsView
      departments={this.getManufacturer().departments.edges.map((edge) => edge.node)}
      onCreateDepartmentClick={this.createDepartment}
      onDepartmentClick={this.handleDepartmentClick}
    />
  );
}

DepartmentsContainer.propTypes = {
  user: rootUserProp.isRequired,
};

export default withRouter(DepartmentsContainer);
