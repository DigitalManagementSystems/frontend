import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Styles from './Styles';

const EmployeeManagementContainer = () => {
  const classes = Styles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>Employee Mgmt.</div>
    </Container>
  );
};

export default EmployeeManagementContainer;
