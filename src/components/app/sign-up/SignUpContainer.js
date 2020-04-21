import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import SignUp from './SignUp';

export class SignUpContainer extends Component {
  state = {};

  signUp = ({ email, password, userType }) => {
    firebase.createUser({ email, password }, { email, userType });
  };

  static getDerivedStateFromProps = ({ userFound, history }) => {
    if (userFound) {
      history.push('/');
    }

    return null;
  };

  render = () => <SignUp onSubmit={this.signUp} />;
}

const mapStateToProps = (state) => ({
  userFound: !!state.firebase.auth.uid,
});

export default withRouter(connect(mapStateToProps)(SignUpContainer));
