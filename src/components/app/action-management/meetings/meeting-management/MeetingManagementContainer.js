import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import graphql from 'babel-plugin-relay/macro';
import { createRefetchContainer } from 'react-relay';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import MSOPSelectorView, { FormName as MSOPSelectorViewFormName } from './MSOPSelectorView';
import ActionPointsView from './ActionPointsView';

export class MeetingsContainer extends Component {
  state = { selectedMSOPId: '' };

  static getDerivedStateFromProps = ({ selectedMSOPId, relay: { refetch } }, state) => {
    if (state.selectedMSOPId === selectedMSOPId) {
      return null;
    }

    refetch(
      {
        selectedMSOPId: selectedMSOPId ? selectedMSOPId : 'No ID',
        isMSOPSelected: !!selectedMSOPId,
      },
      () => {},
      { force: true },
    );

    return { selectedMSOPId };
  };

  createActionPoint = () => {};

  handleActionPointClick = (id) => {};

  render = () => (
    <div>
      <MSOPSelectorView user={this.props.user} />
      <ActionPointsView user={this.props.user} onCreateActionPointClick={this.createActionPoint} onActionPointClick={this.handleActionPointClick} />
    </div>
  );
}

MeetingsContainer.propTypes = {};

const msopSelectorViewFormNameSelector = formValueSelector(MSOPSelectorViewFormName);

const mapStateToProps = (state) => ({ selectedMSOPId: msopSelectorViewFormNameSelector(state, 'selectedMSOPId') });

export default createRefetchContainer(
  withRouter(connect(mapStateToProps)(MeetingsContainer)),
  {
    user: graphql`
      fragment MeetingManagementContainer_user on User {
        manufacturers(first: 1) @connection(key: "User_manufacturers") {
          edges {
            node {
              id
            }
          }
        }
        ...MSOPSelectorView_user
        ...ActionPointsView_user
      }
    `,
  },
  graphql`
    query MeetingManagementContainerQuery($selectedMSOPId: ID!, $isMSOPSelected: Boolean!) {
      user {
        ...MeetingManagementContainer_user
      }
    }
  `,
);
