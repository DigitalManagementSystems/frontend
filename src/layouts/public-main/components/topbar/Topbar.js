import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { withTranslation } from 'react-i18next';

import styles from './Styles';

const Topbar = ({ t, className, onManufacturerSignUpClick, onSignInClick }) => {
  const classes = styles();

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <Avatar alt="Logo" src="/images/logos/logo-white.png" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Button color="inherit" onClick={onManufacturerSignUpClick}>
          {t('manufacturerSignUp.title')}
        </Button>
        <Button color="inherit" onClick={onSignInClick}>
          {t('signin.button')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onManufacturerSignUpClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

export default withTranslation()(Topbar);
