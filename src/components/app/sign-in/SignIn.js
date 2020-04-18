import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation } from 'react-i18next';

import styles from './Styles';
import { renderTextField } from '../../common/redux-form';
import validate from './Validation';

const SignIn = ({ t, handleSubmit, pristine, submitting }) => {
  const classes = styles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signIn.title')}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('email.label')}
            name="email"
            autoComplete="email"
            autoFocus
            component={renderTextField}
          />
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('password.label')}
            type="password"
            autoComplete="current-password"
            component={renderTextField}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={pristine || submitting}>
            {t('signIn.button')}
          </Button>
        </form>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SignInForm',
  validate,
})(withTranslation()(SignIn));
