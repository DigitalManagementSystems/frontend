import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import styles from './Styles';

const ProfileContainer = ({ className, email }) => {
  const classes = styles();

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar alt="Person" className={classes.avatar} />
      <Typography className={classes.name} variant="h4">
        Morteza Alizadeh
      </Typography>
      <Typography variant="body2">{email}</Typography>
    </div>
  );
};

ProfileContainer.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => {
  return { email: state.firebase.auth.email };
};

export default connect(mapStateToProps)(ProfileContainer);
