import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../../framework/relay';
import DepartmentManagementRelayContainer from './DepartmentManagementRelayContainer';

class Departments extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <DepartmentManagementRelayContainer user={props.user} />;
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
          query DepartmentsQuery($departmentIds: [ID!]) {
            user {
              ...DepartmentManagementRelayContainer_user
            }
          }
        `}
        variables={{
          departmentIds: ['ID1', 'ID2', 'ID3'],
        }}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default Departments;
