import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SetMSOPView from './SetMSOPView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { CreateMSOP, UpdateMSOP } from '../../../../../framework/relay/mutations';
import { NotificationType } from '../../../../../framework/redux/notification';
import * as notificationActions from '../../../../../framework/redux/notification/Actions';

export class SetMSOPContainer extends Component {
  setMSOP = ({ meetingName }) => {
    const { history, environment, createMSOP, updateMSOP, notificationActions, user } = this.props;
    const manufacturer = this.getManufacturer();

    if (manufacturer.msop) {
      const {
        msop: { id },
      } = manufacturer;

      updateMSOP(
        environment,
        {
          id,
          meetingName,
          manufacturerId: manufacturer.id,
        },
        user,
        {
          onSuccess: () => {
            notificationActions.add('Successfully updated the MSOP', NotificationType.SUCCESS);
            history.push('/action-management/msops');
          },
          onError: (errorMessage) => notificationActions.add(errorMessage, NotificationType.ERROR),
        },
      );
    } else {
      createMSOP(
        environment,
        {
          meetingName,
          manufacturerId: manufacturer.id,
        },
        null,
        {
          onSuccess: () => {
            notificationActions.add('Successfully created the MSOP', NotificationType.SUCCESS);
            history.push('/action-management/msops');
          },
          onError: (errorMessage) => notificationActions.add(errorMessage, NotificationType.ERROR),
        },
      );
    }
  };

  cancel = () => {
    const { history } = this.props;

    history.push('/action-management/msops');
  };

  getManufacturer = () => this.props.user.manufacturers.edges[0].node;

  render = () => {
    const manufacturer = this.getManufacturer();

    return (
      <SetMSOPView
        msop={manufacturer.msop ? manufacturer.msop : null}
        meetingFrequencies={manufacturer.meetingFrequencies.edges.map((edge) => edge.node)}
        meetingDays={manufacturer.meetingDays.edges.map((edge) => edge.node)}
        departments={manufacturer.departments.edges.map((edge) => edge.node)}
        employees={manufacturer.employees.edges.map((edge) => edge.node)}
        onSubmit={this.setMSOP}
        onCancelButtonClick={this.cancel}
      />
    );
  };
}

SetMSOPContainer.propTypes = {
  notificationActions: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createMSOP: CreateMSOP,
  updateMSOP: UpdateMSOP,
});

const mapDispatchToProps = (dispatch) => ({
  notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetMSOPContainer));
