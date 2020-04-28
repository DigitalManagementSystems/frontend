import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { msopProp } from './PropTypes';
import Styles from './Styles';

const MSOPView = ({ msop: { id, meetingName, meetingDuration, frequency }, onMSOPClick }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onMSOPClick(id)}>
          {meetingName}
        </Link>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {meetingDuration}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {frequency.name}
      </TableCell>
    </TableRow>
  );
};

MSOPView.propTypes = {
  msop: msopProp.isRequired,
  onMSOPClick: PropTypes.func.isRequired,
};

export default MSOPView;
