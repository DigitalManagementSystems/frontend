import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SetDepartmentView from './SetDepartmentView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { CreateDepartment, UpdateDepartment } from '../../../../../framework/relay/mutations';

export class SetDepartmentContainer extends Component {
  setDepartment = ({ name, description }) => {
    const { history, environment, createDepartment, updateDepartment, user } = this.props;

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
        { onSuccess: () => history.push('/hr/departments') },
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
        { onSuccess: () => history.push('/hr/departments') },
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

SetDepartmentContainer.propTypes = {};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createDepartment: CreateDepartment,
  updateDepartment: UpdateDepartment,
});

export default withRouter(connect(mapStateToProps)(SetDepartmentContainer));
