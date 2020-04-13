import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InputIcon from '@material-ui/icons/Input';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';

import { ProfileContainer, SidebarNavContainer } from './components';
import styles from './Styles';

const SidebarContainer = ({ history, open, variant, onClose, className }) => {
  const classes = styles();

  const dashboard = () => {
    history.push('/dashboard');
  };

  const signOut = () => {
    firebase.logout();
  };

  const pages = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      onClick: dashboard,
      icon: <DashboardIcon />,
    },
    {
      key: 'signout',
      title: 'Sign Out',
      onClick: signOut,
      icon: <InputIcon />,
    },
  ];

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div className={clsx(classes.root, className)}>
        <ProfileContainer />
        <Divider className={classes.divider} />
        <SidebarNavContainer className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

SidebarContainer.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default withRouter(SidebarContainer);
