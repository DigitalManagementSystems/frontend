import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Styles from './Styles';
import MeetingsTableHeader from './MeetingsTableHeader';
import MeetingView from './MeetingView';

const MeetingsView = ({ meetings, onCreateMeetingClick, onMeetingClick }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <MeetingsTableHeader />
            <TableBody>
              {meetings.map((meeting) => (
                <MeetingView key={meeting.id} meeting={meeting} onMeetingClick={onMeetingClick} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateMeetingClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

MeetingsView.propTypes = {
  onCreateMeetingClick: PropTypes.func.isRequired,
  onMeetingClick: PropTypes.func.isRequired,
};

export default MeetingsView;
