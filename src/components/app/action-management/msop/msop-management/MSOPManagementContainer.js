import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import MSOPsView from './MSOPsView';

export class MSOPsContainer extends Component {
  createMSOP = () => {
    const { history } = this.props;

    history.push('/action-management/msop/create');
  };

  handleMSOPClick = (id) => {
    const { history } = this.props;
    const linkToMSOP = `/action-management/msops/${id}`;

    history.push(linkToMSOP);
  };

  render = () => <MSOPsView user={this.props.user} onCreateMSOPClick={this.createMSOP} onMSOPClick={this.handleMSOPClick} />;
}

MSOPsContainer.propTypes = {};

export default createFragmentContainer(withRouter(MSOPsContainer), {
  user: graphql`
    fragment MSOPManagementContainer_user on User {
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            msops(first: 1000) @connection(key: "User_msops") {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
      ...MSOPsView_user
    }
  `,
});
