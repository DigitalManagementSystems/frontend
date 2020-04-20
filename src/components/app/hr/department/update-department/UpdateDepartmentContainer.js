import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UpdateDepartmentView from './UpdateDepartmentView';
import { RelayEnvironment } from '../../../../../framework/relay';
import { UpdateDepartment } from '../../../../../framework/relay/mutations';

export class UpdateDepartmentContainer extends Component {
  updateDepartment = ({ name, description }) => {
    const { history, environment, updateDepartment, user } = this.props;
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
  };

  cancel = (values) => {
    const { history } = this.props;

    history.push('/hr/department-management');
  };

  render = () => <UpdateDepartmentView department={this.props.user.department} onSubmit={this.updateDepartment} onCancelButtonClick={this.cancel} />;
}

UpdateDepartmentContainer.propTypes = {};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  updateDepartment: UpdateDepartment,
});

export default withRouter(connect(mapStateToProps)(UpdateDepartmentContainer));
