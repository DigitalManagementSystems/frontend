import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation } from 'react-i18next';

import styles from './Styles';
import { renderTextField, renderAutocomplete } from '../../../../common/redux-form';
import validate from './Validation';

export const SetEmployeeView = ({ t, handleSubmit, submitting, onCancelButtonClick, employee, user }) => {
  const classes = styles();
  const isCreating = !!!employee;
  const registeredUsers = user.registeredUsers.edges.map(({ node }) => node);
  const manufacturer = user.manufacturers.edges[0].node;
  const departments = manufacturer.departments.edges.map(({ node }) => node);
  const employees = manufacturer.employees.edges.map(({ node }) => node);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isCreating ? t('createEmployee.title') : t('updateEmployee.title')}
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
            defaultValue={isCreating ? null : employee.user.id}
          />
          <Field
            id="departmentIds"
            name="departmentIds"
            label={t('departments.label')}
            fullWidth
            options={departments.map((department) => department.id)}
            getOptionLabel={(id) => departments.find((department) => department.id === id).name}
            component={renderAutocomplete}
            defaultValue={isCreating ? [] : employee.departments.map((department) => department.id)}
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
            defaultValue={isCreating ? null : employee.employeeReference}
          />
          <Field
            id="position"
            name="position"
            label={t('position.label')}
            variant="outlined"
            margin="normal"
            fullWidth
            component={renderTextField}
            defaultValue={isCreating ? null : employee.position}
          />
          <Field
            id="mobile"
            name="mobile"
            label={t('mobile.label')}
            variant="outlined"
            margin="normal"
            fullWidth
            component={renderTextField}
            defaultValue={isCreating ? null : employee.mobile}
          />
          <Field
            id="reportingToEmployeeId"
            name="reportingToEmployeeId"
            label={t('reportingTo.label')}
            options={employees.map((employee) => employee.id)}
            getOptionLabel={(id) => employees.find((employee) => employee.id === id).user.email}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isCreating || !employee.reportingToEmployee ? null : employee.reportingToEmployee.id}
          />
          <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={submitting}>
            {isCreating ? t('create.button') : t('update.button')}
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
};

export const FormName = 'SetEmployeeForm';

export default createFragmentContainer(
  reduxForm({
    form: FormName,
    validate,
  })(withTranslation()(SetEmployeeView)),
  {
    user: graphql`
      fragment SetEmployeeView_user on User {
        registeredUsers(first: 1000) @connection(key: "User_registeredUsers") {
          edges {
            node {
              id
              email
            }
          }
        }
        manufacturers(first: 1) @connection(key: "User_manufacturers") {
          edges {
            node {
              id
              departments(first: 1000) @connection(key: "User_departments") {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              employees(first: 1000) @connection(key: "User_employees") {
                edges {
                  node {
                    id
                    user {
                      email
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    employee: graphql`
      fragment SetEmployeeView_employee on Employee {
        id
        employeeReference
        position
        mobile
        reportingToEmployee {
          id
          user {
            email
          }
        }
        user {
          id
          email
        }
        departments {
          id
          name
        }
      }
    `,
  },
);
