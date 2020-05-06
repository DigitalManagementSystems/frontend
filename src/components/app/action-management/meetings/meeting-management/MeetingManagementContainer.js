import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { rootUserProp } from './PropTypes';
import MeetingsView from './MeetingsView';

export class MeetingsContainer extends Component {
  createMeeting = () => {
    const { history } = this.props;

    history.push('/action-management/meeting/create');
  };

  handleMeetingClick = (id) => {
    const { history } = this.props;
    const linkToMeeting = `/action-management/meetings/${id}`;

    history.push(linkToMeeting);
  };

  getManufacturer = () => this.props.user.manufacturers.edges[0].node;

  render = () => (
    <MeetingsView
      meetings={this.getManufacturer().meetings.edges.map((edge) => edge.node)}
      onCreateMeetingClick={this.createMeeting}
      onMeetingClick={this.handleMeetingClick}
    />
  );
}

MeetingsContainer.propTypes = {
  user: rootUserProp.isRequired,
};

export default withRouter(MeetingsContainer);
