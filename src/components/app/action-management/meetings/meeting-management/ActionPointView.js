import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import Styles from './Styles';

export const ActionPointView = ({ actionPoint: { id, assignedDate }, onActionPointClick }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onActionPointClick(id)}>
          {assignedDate}
        </Link>
      </TableCell>
    </TableRow>
  );
};

ActionPointView.propTypes = {
  onActionPointClick: PropTypes.func.isRequired,
};

export default createFragmentContainer(ActionPointView, {
  actionPoint: graphql`
    fragment ActionPointView_actionPoint on ActionPointProperties {
      id
      assignedDate
    }
  `,
});
