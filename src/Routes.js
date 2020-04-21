import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components/common';
import { PublicMainContainer, MainContainer } from './layouts';
import { LoadingContainer, NotFoundContainer } from './components/common';
import { PublicHomeContainer, SignUpContainer, SignInContainer, DashboardContainer } from './components/app';
import { Departments, CreateDepartmentContainer, UpdateDepartment } from './components/app/hr/department';
import { Employees, CreateEmployeeContainer } from './components/app/hr/employee';
import { ErrorHandlerContainer } from './components/common';

const Routes = ({ isLoaded, userFound }) => {
  if (!isLoaded) {
    return <LoadingContainer />;
  }

  return (
    <div>
      <Switch>
        {userFound ? (
          <RouteWithLayout isSecureRoute={true} exact component={DashboardContainer} layout={MainContainer} path="/" />
        ) : (
          <RouteWithLayout isSecureRoute={false} exact component={PublicHomeContainer} layout={PublicMainContainer} path="/" />
        )}

        <RouteWithLayout isSecureRoute={false} exact component={SignUpContainer} layout={PublicMainContainer} path="/signup" />
        <RouteWithLayout isSecureRoute={false} exact component={SignInContainer} layout={PublicMainContainer} path="/signin" />
        <RouteWithLayout isSecureRoute={true} exact component={Departments} layout={MainContainer} path="/hr/department-management" />
        <RouteWithLayout isSecureRoute={true} exact component={CreateDepartmentContainer} layout={MainContainer} path="/hr/create-department" />
        <RouteWithLayout isSecureRoute={true} exact component={UpdateDepartment} layout={MainContainer} path="/hr/departments/:departmentId" />
        <RouteWithLayout isSecureRoute={true} exact component={Employees} layout={MainContainer} path="/hr/employee-management" />
        <RouteWithLayout isSecureRoute={true} exact component={CreateEmployeeContainer} layout={MainContainer} path="/hr/create-employee" />
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
      <ErrorHandlerContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoaded: state.firebase.auth.isLoaded,
  userFound: !!state.firebase.auth.uid,
});

export default connect(mapStateToProps)(Routes);
