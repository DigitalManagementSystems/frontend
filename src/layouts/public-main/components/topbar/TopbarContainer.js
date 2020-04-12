import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import styles from './Styles';

const TopbarContainer = ({ className, history }) => {
  const classes = styles();

  const signUp = () => {
    history.push('/signup');
  };

  const signIn = () => {
    history.push('/signin');
  };

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <Avatar alt="Logo" src="/images/logos/logo-white.png" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Button color="inherit" onClick={signUp}>
          Sign Up
        </Button>
        <Button color="inherit" onClick={signIn}>
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

TopbarContainer.propTypes = {
  className: PropTypes.string,
};

export default withRouter(TopbarContainer);
