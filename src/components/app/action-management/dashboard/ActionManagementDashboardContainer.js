import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Styles from './Styles';

const ActionManagementDashboardContainer = () => {
  const classes = Styles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>Action Management Dashboard</div>
    </Container>
  );
};

export default ActionManagementDashboardContainer;
