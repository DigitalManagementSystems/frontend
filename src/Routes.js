import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components/common';
import { PublicMainContainer, MainContainer } from './layouts';
import { LoadingContainer, NotFoundContainer } from './components/common';
import { PublicHomeContainer, SignUpContainer, SignInContainer, DashboardContainer } from './components/app';
import { NotificationHandlerContainer } from './components/common';
import { Departments, SetDepartment } from './components/app/hr/department';
import { Employees, SetEmployee } from './components/app/hr/employee';
import { MSOPs, SetMSOP } from './components/app/action-management/msop';
import { Meetings } from './components/app/action-management/meetings';

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
        <RouteWithLayout isSecureRoute={true} exact component={Departments} layout={MainContainer} path="/hr/department" />
        <RouteWithLayout isSecureRoute={true} exact component={SetDepartment} layout={MainContainer} path="/hr/department/create" />
        <RouteWithLayout isSecureRoute={true} exact component={SetDepartment} layout={MainContainer} path="/hr/department/:departmentId" />
        <RouteWithLayout isSecureRoute={true} exact component={Employees} layout={MainContainer} path="/hr/employee" />
        <RouteWithLayout isSecureRoute={true} exact component={SetEmployee} layout={MainContainer} path="/hr/employee/:employeeId" />
        <RouteWithLayout isSecureRoute={true} exact component={SetEmployee} layout={MainContainer} path="/hr/employee/create" />
        <RouteWithLayout isSecureRoute={true} exact component={MSOPs} layout={MainContainer} path="/action-management/msop" />
        <RouteWithLayout isSecureRoute={true} exact component={SetMSOP} layout={MainContainer} path="/action-management/msop/create" />
        <RouteWithLayout isSecureRoute={true} exact component={SetMSOP} layout={MainContainer} path="/action-management/msop/:msopId" />
        <RouteWithLayout isSecureRoute={true} exact component={Meetings} layout={MainContainer} path="/action-management/action-point/meeting" />
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
      <NotificationHandlerContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoaded: state.firebase.auth.isLoaded,
  userFound: !!state.firebase.auth.uid,
});

export default connect(mapStateToProps)(Routes);
