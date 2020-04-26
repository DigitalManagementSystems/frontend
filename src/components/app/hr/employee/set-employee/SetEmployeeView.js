import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withTranslation } from 'react-i18next';

import { registeredUsersProp, departmentsProp } from './PropTypes';
import styles from './Styles';
import { renderTextField } from '../../../../common/redux-form';
import validate from './Validation';

export const SetEmployeeView = ({
  t,
  handleSubmit,
  pristine,
  submitting,
  onCancelButtonClick,
  registeredUsers,
  departments,
  employee,
  onUserSelect,
  onDepartmentsSelect,
}) => {
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
          <Autocomplete
            id="userEmail"
            options={registeredUsers}
            getOptionLabel={(registeredUser) => registeredUser.email}
            defaultValue={isAdding ? null : employee.user}
            renderInput={(params) => (
              <TextField margin="normal" {...params} variant="outlined" label={t('email.label')} placeholder={t('email.label')} />
            )}
            onChange={onUserSelect}
          />
          <Autocomplete
            id="userDepartments"
            multiple
            limitTags={2}
            options={departments}
            getOptionLabel={(department) => department.name}
            defaultValue={isAdding ? [] : employee.departments}
            renderInput={(params) => (
              <TextField margin="normal" {...params} variant="outlined" label={t('departments.label')} placeholder={t('departments.label')} />
            )}
            onChange={onDepartmentsSelect}
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
          <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={submitting}>
            {isAdding ? t('create.button') : t('update.button')}
          </Button>
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
  onCancelButtonClick: PropTypes.func.isRequired,
  registeredUsers: registeredUsersProp.isRequired,
  departments: departmentsProp.isRequired,
  onUserSelect: PropTypes.func.isRequired,
  onDepartmentsSelect: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SetEmployeeForm',
  validate,
})(withTranslation()(SetEmployeeView));
