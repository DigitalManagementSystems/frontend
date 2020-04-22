import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../../framework/relay';
import SetDepartmentRelayContainer from './SetDepartmentRelayContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

class SetDepartment extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <SetDepartmentRelayContainer user={props.user} />;
    } else if (error) {
      return <GenericErrorContainer message={error.message} />;
    }

    return <LoadingContainer />;
  };

  render = () => {
    return (
      <QueryRenderer
        environment={RelayEnvironment}
        query={graphql`
          query SetDepartmentQuery($departmentId: ID!) {
            user {
              ...SetDepartmentRelayContainer_user
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

export default withRouter(SetDepartment);
