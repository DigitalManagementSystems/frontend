import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import ManufacturerSignUp from './ManufacturerSignUp';

export class ManufacturerSignUpContainer extends Component {
  signUp = ({ email, password }) => {
    firebase.createUser({ email, password }, { username: email, userType: 'Manufacturer' });
  };

  componentDidUpdate = () => {
    const { userFound, history } = this.props;

    if (userFound) {
      history.push('/');
    }
  };

  render = () => {
    return <ManufacturerSignUp onSubmit={this.signUp} />;
  };
}

const mapStateToProps = (state) => ({
  userFound: !!state.firebase.auth.uid,
});

export default withRouter(connect(mapStateToProps)(ManufacturerSignUpContainer));
