import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import MSOPManagementContainer from './MSOPManagementContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

export default () => {
  const renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <MSOPManagementContainer user={props.user} />;
    } else if (error) {
      return <GenericErrorContainer message={error.message} />;
    }

    return <LoadingContainer />;
  };

  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={graphql`
        query MSOPsQuery {
          user {
            ...MSOPManagementContainer_user
          }
        }
      `}
      variables={{}}
      render={renderRelayComponent}
    />
  );
};
