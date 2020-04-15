import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import ManufacturerSignUp from './ManufacturerSignUp';

export class ManufacturerSignUpContainer extends Component {
  signUp = ({ email, password }) => {
    firebase.createUser({ email, password }, { username: email, userType: 'Manufacturer' });
  };

  static getDerivedStateFromProps = ({ userFound, history }) => {
    if (userFound) {
      history.push('/');
    }

    return null;
  };

  render = () => <ManufacturerSignUp onSubmit={this.signUp} />;
}

const mapStateToProps = (state) => ({
  userFound: !!state.firebase.auth.uid,
});

export default withRouter(connect(mapStateToProps)(ManufacturerSignUpContainer));
