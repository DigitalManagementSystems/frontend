import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components/common';
import { PublicMainContainer, MainContainer } from './layouts';
import {
  UserLoadingContainer,
  NotFoundContainer,
  PublicHomeContainer,
  ManufacturerSignUpContainer,
  EmployeeSignUpContainer,
  SignInContainer,
  DashboardContainer,
} from './components/app';

const Routes = ({ isLoaded, userFound }) => {
  if (!isLoaded) {
    return <UserLoadingContainer />;
  }

  return (
    <Switch>
      {userFound ? (
        <RouteWithLayout isSecureRoute={true} exact component={DashboardContainer} layout={MainContainer} path="/" />
      ) : (
        <RouteWithLayout isSecureRoute={false} exact component={PublicHomeContainer} layout={PublicMainContainer} path="/" />
      )}

      <RouteWithLayout isSecureRoute={false} exact component={ManufacturerSignUpContainer} layout={PublicMainContainer} path="/manufacturer-signup" />
      <RouteWithLayout isSecureRoute={false} exact component={EmployeeSignUpContainer} layout={PublicMainContainer} path="/employee-signup" />
      <RouteWithLayout isSecureRoute={false} exact component={SignInContainer} layout={PublicMainContainer} path="/signin" />
      <RouteWithLayout
        isSecureRoute={false}
        exact
        component={NotFoundContainer}
        layout={userFound ? MainContainer : PublicMainContainer}
        path="/notfound"
      />
      <RouteWithLayout isSecureRoute={true} exact component={DashboardContainer} layout={MainContainer} path="/dashboard" />
      <Redirect to="/notfound" />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoaded: state.firebase.auth.isLoaded,
    userFound: !!state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(Routes);
