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
import { renderTextField } from '../../../../common/redux-form';
import validate from './Validation';

export const DepartmentView = ({ t, handleSubmit, submitting, onCancelButtonClick, department }) => {
  const classes = styles();
  const isCreating = !!!department;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isCreating ? t('createDepartment.title') : t('updateDepartment.title')}
        </Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label={t('name.label')}
            name="name"
            autoFocus
            component={renderTextField}
            defaultValue={isCreating ? null : department.name}
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label={t('description.label')}
            name="description"
            component={renderTextField}
            defaultValue={isCreating ? null : department.description}
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

DepartmentView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
};

export const FormName = 'SetDepartmentForm';

export const CreateDepartmentView = reduxForm({
  form: FormName,
  validate,
})(withTranslation()(DepartmentView));

export const UpdateDepartmentView = createFragmentContainer(CreateDepartmentView, {
  department: graphql`
    fragment SetDepartmentView_department on Department {
      id
      name
      description
    }
  `,
});
