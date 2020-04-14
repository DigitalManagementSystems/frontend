import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

import styles from './Styles';

const Topbar = ({ className, onSidebarOpen }) => {
  const classes = styles();

  return (
    <AppBar className={clsx(classes.root, className)}>
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

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func.isRequired,
};

export default Topbar;
