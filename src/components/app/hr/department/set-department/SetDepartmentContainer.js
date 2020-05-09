import React, { Component } from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CreateDepartmentView, UpdateDepartmentView } from './SetDepartmentView';
import { CreateDepartment, UpdateDepartment } from '../../../../../framework/relay/mutations';
import { NotificationType } from '../../../../../framework/redux/notification';
import * as notificationActions from '../../../../../framework/redux/notification/Actions';

export class SetDepartmentContainer extends Component {
  setDepartment = ({ name, description }) => {
    const {
      history,
      relay: { environment },
      createDepartment,
      updateDepartment,
      notificationActions,
      user,
    } = this.props;
    const manufacturer = this.getManufacturer();

    if (manufacturer.department) {
      const {
        department: { id },
      } = manufacturer;

      updateDepartment(
        environment,
        {
          id,
          name,
          description,
          manufacturerId: manufacturer.id,
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
      createDepartment(
        environment,
        {
          name,
          description,
          manufacturerId: manufacturer.id,
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

  cancel = () => {
    const { history } = this.props;

    history.push('/hr/departments');
  };

  getManufacturer = () => this.props.user.manufacturers.edges[0].node;

  render = () => {
    const manufacturer = this.getManufacturer();

    if (manufacturer.department) {
      return <UpdateDepartmentView department={manufacturer.department} onSubmit={this.setDepartment} onCancelButtonClick={this.cancel} />;
    }

    return <CreateDepartmentView onSubmit={this.setDepartment} onCancelButtonClick={this.cancel} />;
  };
}

SetDepartmentContainer.propTypes = {
  notificationActions: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  createDepartment: CreateDepartment,
  updateDepartment: UpdateDepartment,
});

const mapDispatchToProps = (dispatch) => ({
  notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default createFragmentContainer(withRouter(connect(mapStateToProps, mapDispatchToProps)(SetDepartmentContainer)), {
  user: graphql`
    fragment SetDepartmentContainer_user on User {
      id
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            department(id: $departmentId) @include(if: $isUpdating) {
              id
              ...SetDepartmentView_department
            }
          }
        }
      }
    }
  `,
});
