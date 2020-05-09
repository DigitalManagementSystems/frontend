import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../../framework/relay';
import SetDepartmentContainer from './SetDepartmentContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

const SetDepartment = ({
  match: {
    params: { departmentId },
  },
}) => {
  const renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <SetDepartmentContainer user={props.user} />;
    } else if (error) {
      return <GenericErrorContainer message={error.message} />;
    }

    return <LoadingContainer />;
  };

  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={graphql`
        query SetDepartmentQuery($departmentId: ID!, $isUpdating: Boolean!) {
          user {
            ...SetDepartmentContainer_user
          }
        }
      `}
      variables={{
        departmentId: departmentId ? departmentId : 'No ID',
        isUpdating: !!departmentId,
      }}
      render={renderRelayComponent}
    />
  );
};

export default withRouter(SetDepartment);
