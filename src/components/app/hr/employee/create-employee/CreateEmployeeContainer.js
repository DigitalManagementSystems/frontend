import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateEmployeeView from './CreateEmployeeView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { CreateEmployee } from '../../../../../framework/relay/mutations';

export class CreateEmployeeContainer extends Component {
  createEmployee = ({ email, employeeReference }) => {
    const { history, environment, createEmployee, user } = this.props;
    const userId = user.registeredUsers.edges.map((edge) => edge.node).filter((user) => user.email === email)[0];

    createEmployee(
      environment,
      {
        userId,
        employeeReference,
        departmentIds: [],
      },
      null,
      { onSuccess: () => history.push('/hr/employees') },
    );
  };

  cancel = (values) => {
    const { history } = this.props;

    history.push('/hr/employees');
  };

  render = () => (
    <CreateEmployeeView
      registeredUsers={this.props.user.registeredUsers.edges.map((edge) => edge.node)}
      onSubmit={this.createEmployee}
      onCancelButtonClick={this.cancel}
    />
  );
}

CreateEmployeeContainer.propTypes = {};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createEmployee: CreateEmployee,
});
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEmployeeContainer));
