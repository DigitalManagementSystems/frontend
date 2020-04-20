import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateDepartmentView from './CreateDepartmentView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { CreateDepartment } from '../../../../../framework/relay/mutations';

export class CreateDepartmentContainer extends Component {
  createDepartment = ({ name, description }) => {
    const { history, environment, createDepartment, user } = this.props;

    createDepartment(
      environment,
      {
        name,
        description,
      },
      user,
      { onSuccess: () => history.push('/hr/department-management') },
    );
  };

  cancel = (values) => {
    const { history } = this.props;

    history.push('/hr/department-management');
  };

  render = () => <CreateDepartmentView onSubmit={this.createDepartment} onCancelButtonClick={this.cancel} />;
}

CreateDepartmentContainer.propTypes = {};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createDepartment: CreateDepartment,
});

export default withRouter(connect(mapStateToProps)(CreateDepartmentContainer));
