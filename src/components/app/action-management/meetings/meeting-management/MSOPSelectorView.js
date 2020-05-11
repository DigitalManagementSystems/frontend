import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import Styles from './Styles';
import { renderSelect } from '../../../../common/redux-form';

export const MSOPSelectorView = ({ t, user, onCreateMSOPClick, onMSOPClick }) => {
  const classes = Styles();
  const msops = user.manufacturers.edges[0].node.msops;

  return (
    <div>
      <FormControl className={classes.msopSelector}>
        <Typography variant="h6">{t('selectMSOP.label')}</Typography>
        <Field
          variant="outlined"
          margin="normal"
          fullWidth
          id="selectedMSOPId"
          label={t('msop.label')}
          name="selectedMSOPId"
          autoFocus
          component={renderSelect}
        >
          {msops.edges.map(({ node }) => (
            <MenuItem value={node.id}>{node.meetingName}</MenuItem>
          ))}
        </Field>
      </FormControl>
    </div>
  );
};

MSOPSelectorView.propTypes = {
  onCreateMSOPClick: PropTypes.func.isRequired,
  onMSOPClick: PropTypes.func.isRequired,
};

export const FormName = 'MSOPSelectorView';

export default createFragmentContainer(
  reduxForm({
    form: FormName,
  })(withTranslation()(MSOPSelectorView)),
  {
    user: graphql`
      fragment MSOPSelectorView_user on User {
        manufacturers(first: 1) @connection(key: "User_manufacturers") {
          edges {
            node {
              msops(first: 1000) @connection(key: "User_msops") {
                edges {
                  node {
                    id
                    meetingName
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
);
