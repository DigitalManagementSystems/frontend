import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SetDepartmentView from './SetDepartmentView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { CreateDepartment, UpdateDepartment } from '../../../../../framework/relay/mutations';
import { NotificationType } from '../../../../../framework/redux/notification';
import * as notificationActions from '../../../../../framework/redux/notification/Actions';

export class SetDepartmentContainer extends Component {
  setDepartment = ({ name, description }) => {
    const { history, environment, createDepartment, updateDepartment, notificationActions, user } = this.props;

    if (user && user.department) {
      const {
        department: {
          id,
          manufacturer: { id: manufacturerId },
        },
      } = user;

      updateDepartment(
        environment,
        {
          id,
          name,
          description,
          manufacturerId,
        },
        user,
        {
          onSuccess: () => {
            notificationActions.add('Successfully updated the department', NotificationType.SUCCESS);
            history.push('/hr/departments');
          },
          onError: (errorMessage) => notificationActions.add(errorMessage, NotificationType.ERROR),
        },
      );
    } else {
      const manufacturerId = user.manufacturers.edges.map((edge) => edge.node)[0].id;

      createDepartment(
        environment,
        {
          name,
          description,
          manufacturerId,
        },
        null,
        {
          onSuccess: () => {
            notificationActions.add('Successfully created the department', NotificationType.SUCCESS);
            history.push('/hr/departments');
          },
          onError: (errorMessage) => notificationActions.add(errorMessage, NotificationType.ERROR),
        },
      );
    }
  };

  cancel = (values) => {
    const { history } = this.props;

    history.push('/hr/departments');
  };

  render = () => {
    const { user } = this.props;

    return (
      <SetDepartmentView
        department={user && user.department ? user.department : null}
        onSubmit={this.setDepartment}
        onCancelButtonClick={this.cancel}
      />
    );
  };
}

SetDepartmentContainer.propTypes = {
  notificationActions: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createDepartment: CreateDepartment,
  updateDepartment: UpdateDepartment,
});

const mapDispatchToProps = (dispatch) => ({
  notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetDepartmentContainer));
