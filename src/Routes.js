import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {  MinimalContainer } from './layouts';
import { NotFound } from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout component={NotFound} exact layout={MinimalContainer} path="/not-found" />
      <Redirect to="/not-found" />
    </Switch>
  );
};

const mapStateToProps = state => ({ });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
