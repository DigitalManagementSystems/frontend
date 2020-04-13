import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import styles from './Styles';
import Copyright from './Copyright';

const FooterContainer = ({ className, ...rest }) => {
  const classes = styles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
};

FooterContainer.propTypes = {
  className: PropTypes.string,
};

export default FooterContainer;
