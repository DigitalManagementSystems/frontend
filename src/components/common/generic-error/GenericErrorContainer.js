import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Styles from './Styles';

const GenericErrorContainer = ({ message }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Error: {message}
        </Typography>
      </Container>
    </div>
  );
};

GenericErrorContainer.propTypes = {
  message: PropTypes.string.isRequired,
};

export default GenericErrorContainer;
