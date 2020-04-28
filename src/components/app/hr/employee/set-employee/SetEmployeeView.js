import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation } from 'react-i18next';

import { registeredUsersProp, departmentsProp } from './PropTypes';
import styles from './Styles';
import { renderTextField, renderAutocomplete } from '../../../../common/redux-form';
import validate from './Validation';

export const SetEmployeeView = ({ t, handleSubmit, submitting, onCancelButtonClick, registeredUsers, departments, employee, employees }) => {
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
            id="userId"
            name="userId"
            label={t('email.label')}
            required
            fullWidth
            options={registeredUsers.map((registeredUser) => registeredUser.id)}
            getOptionLabel={(id) => registeredUsers.find((registeredUser) => registeredUser.id === id).email}
            component={renderAutocomplete}
            defaultValue={isAdding ? null : employee.user.id}
          />
          <Field
            id="departmentIds"
            name="departmentIds"
            label={t('departments.label')}
            fullWidth
            options={departments.map((department) => department.id)}
            getOptionLabel={(id) => departments.find((department) => department.id === id).name}
            component={renderAutocomplete}
            defaultValue={isAdding ? [] : employee.departments.map((department) => department.id)}
            multiple
            limitTags={2}
          />
          <Field
            id="employeeReference"
            name="employeeReference"
            label={t('employeeReference.label')}
            variant="outlined"
            margin="normal"
            fullWidth
            component={renderTextField}
            defaultValue={isAdding ? null : employee.employeeReference}
          />
          <Field
            id="position"
            name="position"
            label={t('position.label')}
            variant="outlined"
            margin="normal"
            fullWidth
            component={renderTextField}
            defaultValue={isAdding ? null : employee.position}
          />
          <Field
            id="mobile"
            name="mobile"
            label={t('mobile.label')}
            variant="outlined"
            margin="normal"
            fullWidth
            component={renderTextField}
            defaultValue={isAdding ? null : employee.mobile}
          />
          <Field
            id="reportingToEmployeeId"
            name="reportingToEmployeeId"
            label={t('reportingTo.label')}
            options={employees.map((employees) => employees.id)}
            getOptionLabel={(id) => employees.find((employee) => employee.id === id).user.email}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isAdding || !employee.reportingToEmployee ? null : employee.reportingToEmployee.id}
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
};

export default reduxForm({
  form: 'SetEmployeeForm',
  validate,
})(withTranslation()(SetEmployeeView));
