import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

import styles from './Styles';

const TopbarContainer = ({ className, onSidebarOpen, ...rest }) => {
  const classes = styles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <Avatar alt="Logo" src="/images/logos/logo-white.png" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopbarContainer.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func.isRequired,
};

export default TopbarContainer;
