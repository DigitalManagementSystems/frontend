import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import EmployeeSignUp from './EmployeeSignUp';

export class EmployeeSignUpContainer extends Component {
  signUp = ({ email, password }) => {
    firebase.createUser({ email, password }, { username: email, userType: 'Employee' });
  };

  static getDerivedStateFromProps = ({ userFound, history }) => {
    if (userFound) {
      history.push('/');
    }

    return null;
  };

  render = () => <EmployeeSignUp onSubmit={this.signUp} />;
}

const mapStateToProps = (state) => ({
  userFound: !!state.firebase.auth.uid,
});

export default withRouter(connect(mapStateToProps)(EmployeeSignUpContainer));
