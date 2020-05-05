import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { formValueSelector } from 'redux-form';

import { ProfileContainer, SidebarNavContainer } from './components';
import styles from './Styles';

const SidebarContainer = ({ t, history, open, variant, onClose, className, selectedApplication }) => {
  const classes = styles();

  const humanResourceDashboard = () => {
    history.push('/hr/dashboard');
  };

  const actionManagementDashboard = () => {
    history.push('/action-management/dashboard');
  };

  const departmentManagement = () => {
    history.push('/hr/departments');
  };

  const employeeManagement = () => {
    history.push('/hr/employees');
  };

  const msopManagement = () => {
    history.push('/action-management/msops');
  };

  let pages;

  if (selectedApplication === 'humanResource') {
    pages = [
      {
        key: 'dashboard',
        title: t('dashboard.label'),
        onClick: humanResourceDashboard,
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
    ];
  } else if (selectedApplication === 'actionManagement') {
    pages = [
      {
        key: 'dashboard',
        title: t('dashboard.label'),
        onClick: actionManagementDashboard,
        icon: <DashboardIcon />,
      },
      {
        key: 'msopManagement',
        title: t('msopManagement.label'),
        onClick: msopManagement,
        icon: <PermIdentityIcon />,
      },
    ];
  } else {
    pages = [];
  }

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

const selector = formValueSelector('MainTopbarForm');

const mapStateToProps = (state) => ({
  selectedApplication: selector(state, 'selectedApplication'),
});

export default withRouter(connect(mapStateToProps)(withTranslation()(SidebarContainer)));
