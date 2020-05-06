import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components/common';
import { PublicMainContainer, MainContainer } from './layouts';
import { LoadingContainer, NotFoundContainer } from './components/common';
import { PublicHomeContainer, SignUpContainer, SignInContainer } from './components/app';
import { NotificationHandlerContainer } from './components/common';
import { HumanResourceDashboardContainer } from './components/app/hr';
import { Departments, CreateDepartment, UpdateDepartment } from './components/app/hr/department';
import { Employees, CreateEmployee, UpdateEmployee } from './components/app/hr/employee';
import { ActionManagementDashboardContainer } from './components/app/action-management';
import { MSOPs, CreateMSOP, UpdateMSOP } from './components/app/action-management/msop';

const Routes = ({ isLoaded, userFound }) => {
  if (!isLoaded) {
    return <LoadingContainer />;
  }

  return (
    <div>
      <Switch>
        {userFound ? (
          <RouteWithLayout isSecureRoute={true} exact component={ActionManagementDashboardContainer} layout={MainContainer} path="/" />
        ) : (
          <RouteWithLayout isSecureRoute={false} exact component={PublicHomeContainer} layout={PublicMainContainer} path="/" />
        )}

        <RouteWithLayout isSecureRoute={false} exact component={SignUpContainer} layout={PublicMainContainer} path="/signup" />
        <RouteWithLayout isSecureRoute={false} exact component={SignInContainer} layout={PublicMainContainer} path="/signin" />
        <RouteWithLayout isSecureRoute={true} exact component={HumanResourceDashboardContainer} layout={MainContainer} path="/hr/dashboard" />
        <RouteWithLayout isSecureRoute={true} exact component={HumanResourceDashboardContainer} layout={MainContainer} path="/hr" />
        <RouteWithLayout isSecureRoute={true} exact component={Departments} layout={MainContainer} path="/hr/departments" />
        <RouteWithLayout isSecureRoute={true} exact component={CreateDepartment} layout={MainContainer} path="/hr/department/create" />
        <RouteWithLayout isSecureRoute={true} exact component={UpdateDepartment} layout={MainContainer} path="/hr/departments/:departmentId" />
        <RouteWithLayout isSecureRoute={true} exact component={Employees} layout={MainContainer} path="/hr/employees" />
        <RouteWithLayout isSecureRoute={true} exact component={UpdateEmployee} layout={MainContainer} path="/hr/employees/:employeeId" />
        <RouteWithLayout isSecureRoute={true} exact component={CreateEmployee} layout={MainContainer} path="/hr/employee/create" />
        <RouteWithLayout
          isSecureRoute={true}
          exact
          component={ActionManagementDashboardContainer}
          layout={MainContainer}
          path="/action-management/dashboard"
        />
        <RouteWithLayout isSecureRoute={true} exact component={ActionManagementDashboardContainer} layout={MainContainer} path="/action-management" />
        <RouteWithLayout isSecureRoute={true} exact component={MSOPs} layout={MainContainer} path="/action-management/msops" />
        <RouteWithLayout isSecureRoute={true} exact component={CreateMSOP} layout={MainContainer} path="/action-management/msop/create" />
        <RouteWithLayout isSecureRoute={true} exact component={UpdateMSOP} layout={MainContainer} path="/action-management/msops/:msopId" />
        <RouteWithLayout
          isSecureRoute={false}
          exact
          component={NotFoundContainer}
          layout={userFound ? MainContainer : PublicMainContainer}
          path="/notfound"
        />
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
