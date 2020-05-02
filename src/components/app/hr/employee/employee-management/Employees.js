import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import EmployeeManagementRelayContainer from './EmployeeManagementRelayContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

class Employees extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <EmployeeManagementRelayContainer user={props.user} />;
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
          query EmployeesQuery {
            user {
              ...EmployeeManagementRelayContainer_user
            }
          }
        `}
        variables={{}}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default Employees;
