import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import EmployeeManagementRelayContainer from './EmployeeManagementRelayContainer';

class Employees extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <EmployeeManagementRelayContainer user={props.user} />;
    } else if (error) {
      return <div>{error.message}</div>;
    }

    return <div>Loading</div>;
  };

  render = () => {
    return (
      <QueryRenderer
        environment={RelayEnvironment}
        query={graphql`
          query EmployeesQuery($employeeIds: [ID!]) {
            user {
              ...EmployeeManagementRelayContainer_user
            }
          }
        `}
        variables={{
          employeeIds: ['ID1', 'ID2', 'ID3'],
        }}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default Employees;
