import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SetDepartmentView from './SetDepartmentView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { CreateDepartment, UpdateDepartment } from '../../../../../framework/relay/mutations';

export class SetDepartmentContainer extends Component {
  setDepartment = ({ name, description }) => {
    const { history, environment, createDepartment, updateDepartment, user } = this.props;

    if (user) {
      const {
        department: { id },
      } = user;

      updateDepartment(
        environment,
        {
          id,
          name,
          description,
        },
        user,
        { onSuccess: () => history.push('/hr/department-management') },
      );
    } else {
      createDepartment(
        environment,
        {
          name,
          description,
        },
        user,
        { onSuccess: () => history.push('/hr/department-management') },
      );
    }
  };

  cancel = (values) => {
    const { history } = this.props;

    history.push('/hr/department-management');
  };

  render = () => {
    return (
      <SetDepartmentView
        department={this.props.user ? this.props.user.department : null}
        onSubmit={this.setDepartment}
        onCancelButtonClick={this.cancel}
      />
    );
  };
}

SetDepartmentContainer.propTypes = {};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createDepartment: CreateDepartment,
  updateDepartment: UpdateDepartment,
});

export default withRouter(connect(mapStateToProps)(SetDepartmentContainer));
