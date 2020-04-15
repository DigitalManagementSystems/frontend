import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = ({ layout: Layout, component: Component, isSecureRoute, userFound, location, ...rest }) => {
  if (isSecureRoute && !userFound) {
    return <Redirect to={{ pathname: '/signin', state: { from: location } }} />;
  }

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  isSecureRoute: PropTypes.bool.isRequired,
  userFound: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userFound: !!state.firebase.auth.uid,
});

export default withRouter(connect(mapStateToProps)(RouteWithLayout));
