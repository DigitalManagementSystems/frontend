import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import SignIn from './SignIn';

export class SignInContainer extends Component {
  signIn = ({ email, password }) => {
    firebase.login({ email, password });
  };

  componentDidUpdate = () => {
    const { userFound, history } = this.props;

    if (userFound) {
      history.push('/');
    }
  };

  render = () => {
    return <SignIn onSubmit={this.signIn} />;
  };
}

const mapStateToProps = (state) => {
  return {
    userFound: !!state.firebase.auth.uid,
  };
};

export default withRouter(connect(mapStateToProps)(SignInContainer));
