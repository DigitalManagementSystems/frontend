import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import EmployeeManagementContainer from './EmployeeManagementContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

export default () => {
  const renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <EmployeeManagementContainer user={props.user} />;
    } else if (error) {
      return <GenericErrorContainer message={error.message} />;
    }

    return <LoadingContainer />;
  };

  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={graphql`
        query EmployeesQuery {
          user {
            ...EmployeeManagementContainer_user
          }
        }
      `}
      variables={{}}
      render={renderRelayComponent}
    />
  );
};
