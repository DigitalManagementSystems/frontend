import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import MeetingManagementRelayContainer from './MeetingManagementRelayContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

class Meetings extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <MeetingManagementRelayContainer user={props.user} />;
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
          query MeetingsQuery {
            user {
              ...MeetingManagementRelayContainer_user
            }
          }
        `}
        variables={{}}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default Meetings;
