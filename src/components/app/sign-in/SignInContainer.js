import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import SignIn from './SignIn';

export class SignInContainer extends Component {
  state = {};

  signIn = ({ email, password }) => {
    firebase.login({ email, password });
  };

  static getDerivedStateFromProps = ({ userFound, location, history }) => {
    if (userFound) {
      const { from } = location.state || { from: { pathname: '/' } };

      history.replace(from);
    }

    return null;
  };

  render = () => <SignIn onSubmit={this.signIn} />;
}

const mapStateToProps = (state) => ({
  userFound: !!state.firebase.auth.uid,
});

export default withRouter(connect(mapStateToProps)(SignInContainer));
