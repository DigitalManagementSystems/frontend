import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation } from 'react-i18next';

import styles from './Styles';
import { renderTextField, renderAutocomplete } from '../../../../common/redux-form';
import validate from './Validation';

export const SetMSOPView = ({
  t,
  handleSubmit,
  submitting,
  onCancelButtonClick,
  departments,
  msop,
  employees,
  meetingFrequencies,
  meetingDays,
  meetingDurations,
}) => {
  const classes = styles();
  const isAdding = msop === null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isAdding ? t('createMSOP.title') : t('updateMSOP.title')}
        </Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="meetingName"
            label={t('meetingName.label')}
            name="meetingName"
            autoFocus
            component={renderTextField}
            defaultValue={isAdding ? null : msop.meetingName}
          />
          <Field
            id="durationId"
            name="durationId"
            label={t('meetingDuration.label')}
            options={meetingDurations.map((meetingDuration) => meetingDuration.id)}
            getOptionLabel={(id) => meetingDurations.find((meetingDuration) => meetingDuration.id === id).name}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isAdding ? null : msop.duration.id}
          />
          <Field
            id="frequencyId"
            name="frequencyId"
            label={t('meetingFrequency.label')}
            options={meetingFrequencies.map((meetingFrequency) => meetingFrequency.id)}
            getOptionLabel={(id) => meetingFrequencies.find((meetingFrequency) => meetingFrequency.id === id).name}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isAdding ? null : msop.frequency.id}
          />
          <Field
            id="meetingDayIds"
            name="meetingDayIds"
            label={t('meetingDays.label')}
            options={meetingDays.map((meetingDay) => meetingDay.id)}
            getOptionLabel={(id) => meetingDays.find((meetingDay) => meetingDay.id === id).name}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isAdding ? [] : msop.meetingDays.map((meetingDay) => meetingDay.id)}
            multiple
            limitTags={2}
          />
          <Field
            id="departmentId"
            name="departmentId"
            label={t('department.label')}
            options={departments.map((department) => department.id)}
            getOptionLabel={(id) => departments.find((department) => department.id === id).name}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isAdding ? null : msop.department.id}
          />
          <Field
            id="chairPersonEmployeeId"
            name="chairPersonEmployeeId"
            label={t('chairPerson.label')}
            options={employees.map((employee) => employee.id)}
            getOptionLabel={(id) => employees.find((employee) => employee.id === id).user.email}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isAdding ? null : msop.chairPersonEmployee.id}
          />
          <Field
            id="actionLogSecretaryEmployeeId"
            name="actionLogSecretaryEmployeeId"
            label={t('secretary.label')}
            options={employees.map((employee) => employee.id)}
            getOptionLabel={(id) => employees.find((employee) => employee.id === id).user.email}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isAdding ? null : msop.actionLogSecretaryEmployee.id}
          />
          <Field
            id="attendeeIds"
            name="attendeeIds"
            label={t('attendees.label')}
            options={employees.map((employee) => employee.id)}
            getOptionLabel={(id) => employees.find((employee) => employee.id === id).user.email}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isAdding ? [] : msop.attendees.map((attendee) => attendee.id)}
            multiple
            limitTags={2}
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            id="agendas"
            label={t('agendas.label')}
            name="agendas"
            component={renderTextField}
            defaultValue={isAdding ? null : msop.agendas}
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

SetMSOPView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SetMSOPForm',
  validate,
})(withTranslation()(SetMSOPView));
