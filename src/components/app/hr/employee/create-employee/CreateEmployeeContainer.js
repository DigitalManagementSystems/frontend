import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateEmployeeView from './CreateEmployeeView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { CreateEmployee } from '../../../../../framework/relay/mutations';
import { NotificationType } from '../../../../../framework/redux/notification';
import * as notificationActions from '../../../../../framework/redux/notification/Actions';

export class CreateEmployeeContainer extends Component {
  createEmployee = ({ userEmail, employeeReference }) => {
    const { history, environment, createEmployee, user, notificationActions } = this.props;
    const userId = user.registeredUsers.edges.map((edge) => edge.node).filter((user) => user.email === userEmail)[0].id;

    createEmployee(
      environment,
      {
        userId,
        employeeReference,
        departmentIds: [],
      },
      null,
      {
        onSuccess: () => {
          notificationActions.add('Successfully created the employee', NotificationType.SUCCESS);
          history.push('/hr/employees');
        },
        onError: (errorMessage) => notificationActions.add(errorMessage, NotificationType.ERROR),
      },
    );
  };

  cancel = () => {
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

CreateEmployeeContainer.propTypes = {
  notificationActions: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createEmployee: CreateEmployee,
});

const mapDispatchToProps = (dispatch) => ({
  notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEmployeeContainer));
