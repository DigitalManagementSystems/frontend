import React, { Component } from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SetEmployeeView from './SetEmployeeView';
import { CreateEmployee, UpdateEmployee } from '../../../../../framework/relay/mutations';
import { NotificationType } from '../../../../../framework/redux/notification';
import * as notificationActions from '../../../../../framework/redux/notification/Actions';

export class SetEmployeeContainer extends Component {
  setEmployee = ({ userId, departmentIds, employeeReference, position, mobile, reportingToEmployeeId }) => {
    const {
      history,
      relay: { environment },
      createEmployee,
      updateEmployee,
      user,
      notificationActions,
    } = this.props;
    const manufacturer = this.getManufacturer();

    if (manufacturer.employee) {
      const {
        employee: { id },
      } = manufacturer;

      updateEmployee(
        environment,
        {
          id,
          userId,
          employeeReference,
          departmentIds,
          position,
          mobile,
          reportingToEmployeeId,
          manufacturerId: manufacturer.id,
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
          position,
          mobile,
          reportingToEmployeeId,
          manufacturerId: manufacturer.id,
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

  getManufacturer = () => this.props.user.manufacturers.edges[0].node;

  render = () => {
    const { user } = this.props;
    const manufacturer = this.getManufacturer();

    return <SetEmployeeView user={user} employee={manufacturer.employee} onSubmit={this.setEmployee} onCancelButtonClick={this.cancel} />;
  };
}

SetEmployeeContainer.propTypes = {
  notificationActions: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  createEmployee: CreateEmployee,
  updateEmployee: UpdateEmployee,
});

const mapDispatchToProps = (dispatch) => ({
  notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default createFragmentContainer(withRouter(connect(mapStateToProps, mapDispatchToProps)(SetEmployeeContainer)), {
  user: graphql`
    fragment SetEmployeeContainer_user on User {
      id
      ...SetEmployeeView_user
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            employee(id: $employeeId) @include(if: $isUpdating) {
              id
              ...SetEmployeeView_employee
            }
          }
        }
      }
    }
  `,
});
