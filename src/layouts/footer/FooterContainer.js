import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import styles from './Styles';
import Copyright from './Copyright';

const FooterContainer = ({ className, ...rest }) => {
  const classes = styles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary">
          DMS: {window._env_.FRONTEND_VERSION}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
};

FooterContainer.propTypes = {
  className: PropTypes.string,
};

export default FooterContainer;
