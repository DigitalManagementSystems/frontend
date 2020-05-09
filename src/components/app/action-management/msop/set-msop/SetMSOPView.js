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

export const SetMSOPView = ({ t, handleSubmit, submitting, onCancelButtonClick, msop, user }) => {
  const classes = styles();
  const isCreating = !!!msop;
  const manufacturer = user.manufacturers.edges[0].node;
  const departments = manufacturer.departments.edges.map(({ node }) => node);
  const employees = manufacturer.employees.edges.map(({ node }) => node);
  const meetingFrequencies = manufacturer.meetingFrequencies.edges.map(({ node }) => node);
  const meetingDays = manufacturer.meetingDays.edges.map(({ node }) => node);
  const meetingDurations = manufacturer.meetingDurations.edges.map(({ node }) => node);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isCreating ? t('createMSOP.title') : t('updateMSOP.title')}
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
            defaultValue={isCreating ? null : msop.meetingName}
          />
          <Field
            id="durationId"
            name="durationId"
            label={t('meetingDuration.label')}
            required
            options={meetingDurations.map((meetingDuration) => meetingDuration.id)}
            getOptionLabel={(id) => meetingDurations.find((meetingDuration) => meetingDuration.id === id).name}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isCreating ? null : msop.duration.id}
          />
          <Field
            id="frequencyId"
            name="frequencyId"
            label={t('meetingFrequency.label')}
            required
            options={meetingFrequencies.map((meetingFrequency) => meetingFrequency.id)}
            getOptionLabel={(id) => meetingFrequencies.find((meetingFrequency) => meetingFrequency.id === id).name}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isCreating ? null : msop.frequency.id}
          />
          <Field
            id="meetingDayIds"
            name="meetingDayIds"
            label={t('meetingDays.label')}
            required
            options={meetingDays.map((meetingDay) => meetingDay.id)}
            getOptionLabel={(id) => meetingDays.find((meetingDay) => meetingDay.id === id).name}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isCreating ? [] : msop.meetingDays.map((meetingDay) => meetingDay.id)}
            multiple
            limitTags={2}
          />
          <Field
            id="departmentId"
            name="departmentId"
            label={t('department.label')}
            required
            options={departments.map((department) => department.id)}
            getOptionLabel={(id) => departments.find((department) => department.id === id).name}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isCreating ? null : msop.department.id}
          />
          <Field
            id="chairPersonEmployeeId"
            name="chairPersonEmployeeId"
            label={t('chairPerson.label')}
            required
            options={employees.map((employee) => employee.id)}
            getOptionLabel={(id) => employees.find((employee) => employee.id === id).user.email}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isCreating ? null : msop.chairPersonEmployee.id}
          />
          <Field
            id="actionLogSecretaryEmployeeId"
            name="actionLogSecretaryEmployeeId"
            label={t('secretary.label')}
            required
            options={employees.map((employee) => employee.id)}
            getOptionLabel={(id) => employees.find((employee) => employee.id === id).user.email}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isCreating ? null : msop.actionLogSecretaryEmployee.id}
          />
          <Field
            id="attendeeIds"
            name="attendeeIds"
            label={t('attendees.label')}
            options={employees.map((employee) => employee.id)}
            getOptionLabel={(id) => employees.find((employee) => employee.id === id).user.email}
            fullWidth
            component={renderAutocomplete}
            defaultValue={isCreating ? [] : msop.attendees.map((attendee) => attendee.id)}
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
            defaultValue={isCreating ? null : msop.agendas}
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

SetMSOPView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
};

export const FormName = 'SetMSOPForm';

export default createFragmentContainer(
  reduxForm({
    form: FormName,
    validate,
  })(withTranslation()(SetMSOPView)),
  {
    user: graphql`
      fragment SetMSOPView_user on User {
        manufacturers(first: 1) @connection(key: "User_manufacturers") {
          edges {
            node {
              id
              meetingFrequencies(first: 1000) @connection(key: "User_meetingFrequencies") {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              meetingDays(first: 1000) @connection(key: "User_meetingDays") {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              meetingDurations(first: 1000) @connection(key: "User_meetingDurations") {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
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
    msop: graphql`
      fragment SetMSOPView_msop on MSOP {
        id
        meetingName
        duration {
          id
          name
        }
        frequency {
          id
          name
        }
        meetingDays {
          id
          name
        }
        agendas
        department {
          id
          name
        }
        chairPersonEmployee {
          id
          user {
            email
          }
        }
        actionLogSecretaryEmployee {
          id
          user {
            email
          }
        }
        attendees {
          id
          user {
            email
          }
        }
      }
    `,
  },
);
