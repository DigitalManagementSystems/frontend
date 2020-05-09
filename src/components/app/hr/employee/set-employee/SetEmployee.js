import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../../framework/relay';
import SetEmployeeContainer from './SetEmployeeContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

const SetEmployee = ({
  match: {
    params: { employeeId },
  },
}) => {
  const renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <SetEmployeeContainer user={props.user} />;
    } else if (error) {
      return <GenericErrorContainer message={error.message} />;
    }

    return <LoadingContainer />;
  };

  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={graphql`
        query SetEmployeeQuery($employeeId: ID!, $isUpdating: Boolean!) {
          user {
            ...SetEmployeeContainer_user
          }
        }
      `}
      variables={{
        employeeId: employeeId ? employeeId : 'No ID',
        isUpdating: !!employeeId,
      }}
      render={renderRelayComponent}
    />
  );
};

export default withRouter(SetEmployee);
