import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../../framework/relay';
import UpdateEmployeeRelayContainer from './UpdateEmployeeRelayContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

class UpdateEmployee extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <UpdateEmployeeRelayContainer user={props.user} />;
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
          query UpdateEmployeeQuery($employeeId: ID!) {
            user {
              ...UpdateEmployeeRelayContainer_user
            }
          }
        `}
        variables={{
          employeeId: this.props.match.params.employeeId,
        }}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default withRouter(UpdateEmployee);
