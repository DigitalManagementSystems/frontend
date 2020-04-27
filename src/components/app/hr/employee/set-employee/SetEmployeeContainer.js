import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SetEmployeeView from './SetEmployeeView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { CreateEmployee, UpdateEmployee } from '../../../../../framework/relay/mutations';
import { NotificationType } from '../../../../../framework/redux/notification';
import * as notificationActions from '../../../../../framework/redux/notification/Actions';

export class SetEmployeeContainer extends Component {
  createEmployee = ({ userId, departmentIds, employeeReference, position, mobile }) => {
    const { history, environment, createEmployee, updateEmployee, user, notificationActions } = this.props;

    if (user && user.employee) {
      const {
        employee: { id },
      } = user;

      updateEmployee(
        environment,
        {
          id,
          userId,
          employeeReference,
          departmentIds,
          position,
          mobile,
        },
        user,
        {
          onSuccess: () => {
            notificationActions.add('Successfully updated the employee', NotificationType.SUCCESS);
            history.push('/hr/employees');
          },
          onError: (errorMessage) => notificationActions.add(errorMessage, NotificationType.ERROR),
        },
      );
    } else {
      createEmployee(
        environment,
        {
          userId,
          employeeReference,
          departmentIds,
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
    }
  };

  cancel = () => {
    const { history } = this.props;

    history.push('/hr/employees');
  };

  render = () => {
    const { user } = this.props;

    return (
      <SetEmployeeView
        registeredUsers={this.props.user.registeredUsers.edges.map((edge) => edge.node)}
        departments={this.props.user.departments.edges.map((edge) => edge.node)}
        employee={user && user.employee ? user.employee : null}
        onSubmit={this.createEmployee}
        onCancelButtonClick={this.cancel}
      />
    );
  };
}

SetEmployeeContainer.propTypes = {
  notificationActions: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createEmployee: CreateEmployee,
  updateEmployee: UpdateEmployee,
});

const mapDispatchToProps = (dispatch) => ({
  notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetEmployeeContainer));
