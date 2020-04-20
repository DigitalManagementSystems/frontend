import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation } from 'react-i18next';

import styles from './Styles';
import { renderTextField } from '../../../../common/redux-form';
import validate from './Validation';

export const CreateDepartmentView = ({ t, handleSubmit, pristine, submitting, reset, onCancelButtonClick }) => {
  const classes = styles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t('createDepartment.title')}
        </Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label={t('departmentName.label')}
            name="name"
            autoFocus
            component={renderTextField}
          />
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label={t('departmentDescription.label')}
            name="description"
            component={renderTextField}
          />

          <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={pristine || submitting}>
            {t('create.button')}
          </Button>
          <Button type="button" variant="contained" color="secondary" className={classes.submit} disabled={pristine || submitting} onClick={reset}>
            {t('reset.button')}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={pristine || submitting}
            onClick={onCancelButtonClick}
          >
            {t('cancel.button')}
          </Button>
        </form>
      </div>
    </Container>
  );
};

CreateDepartmentView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'CreateDepartmentForm',
  validate,
})(withTranslation()(CreateDepartmentView));
