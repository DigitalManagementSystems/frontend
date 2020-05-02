import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { rootUserProp } from './PropTypes';
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

  getManufacturer = () => this.props.user.manufacturers.edges[0].node;

  render = () => (
    <MSOPsView
      msops={this.getManufacturer().msops.edges.map((edge) => edge.node)}
      onCreateMSOPClick={this.createMSOP}
      onMSOPClick={this.handleMSOPClick}
    />
  );
}

MSOPsContainer.propTypes = {
  user: rootUserProp.isRequired,
};

export default withRouter(MSOPsContainer);
