import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';
import DepartmentManagementContainer from './DepartmentManagementContainer';

class Departments extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <DepartmentManagementContainer user={props.user} />;
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
          query DepartmentsQuery {
            user {
              ...DepartmentManagementContainer_user
            }
          }
        `}
        variables={{}}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default Departments;
