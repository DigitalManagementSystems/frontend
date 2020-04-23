import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../../framework/relay';
import CreateDepartmentRelayContainer from './CreateDepartmentRelayContainer';
import { LoadingContainer, GenericErrorContainer } from '../../../../common';

class CreateDepartment extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <CreateDepartmentRelayContainer user={props.user} />;
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
          query CreateDepartmentQuery {
            user {
              ...CreateDepartmentRelayContainer_user
            }
          }
        `}
        variables={{}}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default withRouter(CreateDepartment);
