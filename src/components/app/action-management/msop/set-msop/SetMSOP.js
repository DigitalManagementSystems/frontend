import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../../framework/relay';
import SetMSOPContainer from './SetMSOPContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

const SetMSOP = ({
  match: {
    params: { msopId },
  },
}) => {
  const renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <SetMSOPContainer user={props.user} />;
    } else if (error) {
      return <GenericErrorContainer message={error.message} />;
    }

    return <LoadingContainer />;
  };

  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={graphql`
        query SetMSOPQuery($msopId: ID!, $isUpdating: Boolean!) {
          user {
            ...SetMSOPContainer_user
          }
        }
      `}
      variables={{
        msopId: msopId ? msopId : 'No ID',
        isUpdating: !!msopId,
      }}
      render={renderRelayComponent}
    />
  );
};

export default withRouter(SetMSOP);
