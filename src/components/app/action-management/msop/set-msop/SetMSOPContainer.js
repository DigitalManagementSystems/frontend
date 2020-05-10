import React, { Component } from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SetMSOPView from './SetMSOPView';
import { CreateMSOP, UpdateMSOP } from '../../../../../framework/relay/mutations';
import { NotificationType } from '../../../../../framework/redux/notification';
import * as notificationActions from '../../../../../framework/redux/notification/Actions';

export class SetMSOPContainer extends Component {
  setMSOP = ({
    meetingName,
    durationId,
    frequencyId,
    agendas,
    meetingDayIds,
    departmentId,
    chairPersonEmployeeId,
    actionLogSecretaryEmployeeId,
    attendeeIds,
  }) => {
    const {
      history,
      relay: { environment },
      createMSOP,
      updateMSOP,
      notificationActions,
      user,
    } = this.props;
    const manufacturer = this.getManufacturer();

    if (manufacturer.msop) {
      const {
        msop: { id },
      } = manufacturer;

      updateMSOP(
        environment,
        {
          id,
          manufacturerId: manufacturer.id,
          meetingName,
          durationId,
          frequencyId,
          agendas,
          meetingDayIds,
          departmentId,
          chairPersonEmployeeId,
          actionLogSecretaryEmployeeId,
          attendeeIds,
        },
        user,
        {
          onSuccess: () => {
            notificationActions.add('Successfully updated the MSOP', NotificationType.SUCCESS);
            history.push('/action-management/msop');
          },
          onError: (errorMessage) => notificationActions.add(errorMessage, NotificationType.ERROR),
        },
      );
    } else {
      createMSOP(
        environment,
        {
          manufacturerId: manufacturer.id,
          meetingName,
          durationId,
          frequencyId,
          agendas,
          meetingDayIds,
          departmentId,
          chairPersonEmployeeId,
          actionLogSecretaryEmployeeId,
          attendeeIds,
        },
        null,
        {
          onSuccess: () => {
            notificationActions.add('Successfully created the MSOP', NotificationType.SUCCESS);
            history.push('/action-management/msop');
          },
          onError: (errorMessage) => notificationActions.add(errorMessage, NotificationType.ERROR),
        },
      );
    }
  };

  cancel = () => {
    const { history } = this.props;

    history.push('/action-management/msop');
  };

  getManufacturer = () => this.props.user.manufacturers.edges[0].node;

  render = () => {
    const { user } = this.props;
    const manufacturer = this.getManufacturer();

    return <SetMSOPView user={user} msop={manufacturer.msop} onSubmit={this.setMSOP} onCancelButtonClick={this.cancel} />;
  };
}

SetMSOPContainer.propTypes = {
  notificationActions: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  createMSOP: CreateMSOP,
  updateMSOP: UpdateMSOP,
});

const mapDispatchToProps = (dispatch) => ({
  notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default createFragmentContainer(withRouter(connect(mapStateToProps, mapDispatchToProps)(SetMSOPContainer)), {
  user: graphql`
    fragment SetMSOPContainer_user on User {
      id
      ...SetMSOPView_user
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            msop(id: $msopId) @include(if: $isUpdating) {
              id
              ...SetMSOPView_msop
            }
          }
        }
      }
    }
  `,
});
