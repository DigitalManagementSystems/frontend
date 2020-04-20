import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../../framework/relay';
import UpdateDepartmentRelayContainer from './UpdateDepartmentRelayContainer';

class UpdateDepartment extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <UpdateDepartmentRelayContainer user={props.user} />;
    } else if (error) {
      return <div>{error.message}</div>;
    }

    return <div>Loading</div>;
  };

  render = () => {
    return (
      <QueryRenderer
        environment={RelayEnvironment}
        query={graphql`
          query UpdateDepartmentQuery($departmentId: ID!) {
            user {
              ...UpdateDepartmentRelayContainer_user
            }
          }
        `}
        variables={{
          departmentId: this.props.match.params.departmentId,
        }}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default withRouter(UpdateDepartment);
