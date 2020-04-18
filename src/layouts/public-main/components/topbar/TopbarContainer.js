import React from 'react';
import { withRouter } from 'react-router-dom';

import Topbar from './Topbar';

const TopbarContainer = ({ history }) => {
  const signUp = () => {
    history.push('/signup');
  };

  const signIn = () => {
    history.push('/signin');
  };

  return <Topbar onSignUpClick={signUp} onSignInClick={signIn} />;
};

export default withRouter(TopbarContainer);
