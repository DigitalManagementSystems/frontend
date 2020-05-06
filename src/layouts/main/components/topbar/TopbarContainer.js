import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';

import Topbar from './Topbar';

class TopbarContainer extends Component {
  state = { anchorEl: null, mobileMoreAnchorEl: null, selectedApplication: null };

  static getDerivedStateFromProps = ({ selectedApplication, history }, state) => {
    if (!state.selectedApplication) {
      history.push('/action-management');

      return { selectedApplication: 'actionManagement' };
    }

    if (selectedApplication !== state.selectedApplication) {
      switch (selectedApplication) {
        case 'humanResource':
          history.push('/hr');

          break;

        case 'actionManagement':
          history.push('/action-management');

          break;

        default:
          break;
      }

      return { selectedApplication };
    }

    return null;
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleProfileClick = () => {
    this.handleMenuClose();
  };

  handleSignOutClick = () => {
    this.handleMenuClose();
    firebase.logout();
  };

  render = () => {
    const { className, onSidebarOpen } = this.props;
    const { anchorEl, mobileMoreAnchorEl, selectedApplication } = this.state;

    return (
      <Topbar
        className={className}
        onSidebarOpen={onSidebarOpen}
        onProfileMenuOpen={this.handleProfileMenuOpen}
        onMobileMenuClose={this.handleMobileMenuClose}
        onMenuClose={this.handleMenuClose}
        onMobileMenuOpen={this.handleMobileMenuOpen}
        isMobileMenuOpen={mobileMoreAnchorEl !== null}
        isMenuOpen={anchorEl !== null}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        anchorEl={anchorEl}
        onProfileClick={this.handleProfileClick}
        onSignOutClick={this.handleSignOutClick}
        selectedApplication={selectedApplication}
      />
    );
  };
}

TopbarContainer.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func.isRequired,
};

const selector = formValueSelector('MainTopbarForm');

const mapStateToProps = (state) => ({
  selectedApplication: selector(state, 'selectedApplication'),
});

export default withRouter(connect(mapStateToProps)(TopbarContainer));
