import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import MeetingManagementContainer from './MeetingManagementContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

export default () => {
  const renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <MeetingManagementContainer user={props.user} />;
    } else if (error) {
      return <GenericErrorContainer message={error.message} />;
    }

    return <LoadingContainer />;
  };

  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={graphql`
        query MeetingsQuery($selectedMSOPId: ID!, $isMSOPSelected: Boolean!) {
          user {
            ...MeetingManagementContainer_user
          }
        }
      `}
      variables={{
        selectedMSOPId: 'No ID',
        isMSOPSelected: false,
      }}
      render={renderRelayComponent}
    />
  );
};
