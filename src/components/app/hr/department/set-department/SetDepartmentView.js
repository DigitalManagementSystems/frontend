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

export const SetDepartmentView = ({ t, handleSubmit, submitting, onCancelButtonClick, department }) => {
  const classes = styles();
  const isAdding = department === null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isAdding ? t('createDepartment.title') : t('updateDepartment.title')}
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
            defaultValue={isAdding ? null : department.name}
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label={t('description.label')}
            name="description"
            component={renderTextField}
            defaultValue={isAdding ? null : department.description}
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

SetDepartmentView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SetDepartmentForm',
  validate,
})(withTranslation()(SetDepartmentView));
