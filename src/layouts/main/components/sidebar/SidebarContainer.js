import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ApartmentIcon from '@material-ui/icons/Apartment';
import InputIcon from '@material-ui/icons/Input';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { ProfileContainer, SidebarNavContainer } from './components';
import styles from './Styles';

const SidebarContainer = ({ t, history, open, variant, onClose, className }) => {
  const classes = styles();

  const dashboard = () => {
    history.push('/dashboard');
  };

  const departmentManagement = () => {
    history.push('/hr/department-management');
  };

  const employeeManagement = () => {
    history.push('/hr/employee-management');
  };

  const signOut = () => {
    firebase.logout();
  };

  const pages = [
    {
      key: 'dashboard',
      title: t('dashboard.label'),
      onClick: dashboard,
      icon: <DashboardIcon />,
    },
    {
      key: 'departmentManagement',
      title: t('departmentManagement.label'),
      onClick: departmentManagement,
      icon: <ApartmentIcon />,
    },
    {
      key: 'employeeManagement',
      title: t('employeeManagement.label'),
      onClick: employeeManagement,
      icon: <PermIdentityIcon />,
    },
    {
      key: 'signout',
      title: t('signOut.label'),
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

export default withRouter(withTranslation()(SidebarContainer));
