import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import CreateMSOPRelayContainer from './CreateMSOPRelayContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

class CreateMSOP extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <CreateMSOPRelayContainer user={props.user} />;
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
          query CreateMSOPQuery {
            user {
              ...CreateMSOPRelayContainer_user
            }
          }
        `}
        variables={{}}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default CreateMSOP;
