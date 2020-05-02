import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../../framework/relay';
import UpdateMSOPRelayContainer from './UpdateMSOPRelayContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

class UpdateMSOP extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <UpdateMSOPRelayContainer user={props.user} />;
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
          query UpdateMSOPQuery($msopId: ID!) {
            user {
              ...UpdateMSOPRelayContainer_user
            }
          }
        `}
        variables={{
          msopId: this.props.match.params.msopId,
        }}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default withRouter(UpdateMSOP);
