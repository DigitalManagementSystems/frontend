import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import MSOPManagementRelayContainer from './MSOPManagementRelayContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

class MSOPs extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <MSOPManagementRelayContainer user={props.user} />;
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
          query MSOPsQuery {
            user {
              ...MSOPManagementRelayContainer_user
            }
          }
        `}
        variables={{}}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default MSOPs;
