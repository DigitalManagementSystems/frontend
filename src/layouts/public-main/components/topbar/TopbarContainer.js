import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Topbar from './Topbar';

const TopbarContainer = ({ className, history }) => {
  const signUp = () => {
    history.push('/signup');
  };

  const signIn = () => {
    history.push('/signin');
  };

  return <Topbar onSignUpClick={signUp} onSignInClick={signIn} />;
};

TopbarContainer.propTypes = {
  className: PropTypes.string,
};

export default withRouter(TopbarContainer);
