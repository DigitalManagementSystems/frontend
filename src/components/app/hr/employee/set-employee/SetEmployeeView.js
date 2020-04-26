import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation } from 'react-i18next';

import { registeredUsersProp } from './PropTypes';
import styles from './Styles';
import { renderTextField, renderAutocomplete } from '../../../../common/redux-form';
import validate from './Validation';

export const SetEmployeeView = ({ t, handleSubmit, pristine, submitting, reset, onCancelButtonClick, registeredUsers, employee }) => {
  const classes = styles();
  const isAdding = employee === null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isAdding ? t('createEmployee.title') : t('updateEmployee.title')}
        </Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Field
            id="userEmail"
            margin="normal"
            name="userEmail"
            label={t('email.label')}
            required
            fullWidth
            options={registeredUsers}
            getOptionLabel={(registeredUser) => registeredUser.email}
            component={renderAutocomplete}
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            id="employeeReference"
            label={t('employeeReference.label')}
            name="employeeReference"
            component={renderTextField}
            defaultValue={isAdding ? null : employee.employeeReference}
          />
          <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={pristine || submitting}>
            {isAdding ? t('create.button') : t('update.button')}
          </Button>
          {isAdding && (
            <Button type="button" variant="contained" color="secondary" className={classes.submit} disabled={submitting} onClick={reset}>
              {t('reset.button')}
            </Button>
          )}
          <Button type="button" variant="contained" color="secondary" className={classes.submit} disabled={submitting} onClick={onCancelButtonClick}>
            {t('cancel.button')}
          </Button>
        </form>
      </div>
    </Container>
  );
};

SetEmployeeView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  registeredUsers: registeredUsersProp.isRequired,
};

export default reduxForm({
  form: 'SetEmployeeForm',
  validate,
})(withTranslation()(SetEmployeeView));
