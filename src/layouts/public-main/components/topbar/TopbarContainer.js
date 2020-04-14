import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Topbar from './Topbar';

const TopbarContainer = ({ className, history }) => {
  const manufacturerSignUp = () => {
    history.push('/manufacturer-signup');
  };

  const employeeSignUp = () => {
    history.push('/employee-signup');
  };

  const signIn = () => {
    history.push('/signin');
  };

  return <Topbar onManufacturerSignUpClick={manufacturerSignUp} onEmployeeSignUpClick={employeeSignUp} onSignInClick={signIn} />;
};

TopbarContainer.propTypes = {
  className: PropTypes.string,
};

export default withRouter(TopbarContainer);
