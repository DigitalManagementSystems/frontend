import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { msopsProp } from './PropTypes';
import Styles from './Styles';
import MSOPsTableHeader from './MSOPsTableHeader';
import MSOPView from './MSOPView';

const MSOPsView = ({ msops, onCreateMSOPClick, onMSOPClick }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <MSOPsTableHeader />
            <TableBody>
              {msops.map((msop) => (
                <MSOPView key={msop.id} msop={msop} onMSOPClick={onMSOPClick} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateMSOPClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

MSOPsView.propTypes = {
  msops: msopsProp.isRequired,
  onCreateMSOPClick: PropTypes.func.isRequired,
  onMSOPClick: PropTypes.func.isRequired,
};

export default MSOPsView;
