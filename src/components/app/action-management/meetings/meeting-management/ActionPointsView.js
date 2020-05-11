import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Styles from './Styles';
import ActionPointTableHeader from './ActionPointTableHeader';
import ActionPointView from './ActionPointView';

export const ActionPointsView = ({ user, onActionPointClick, onCreateActionPointClick }) => {
  const classes = Styles();
  const actionPoints = user.manufacturers.edges[0].node.actionPoints;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <ActionPointTableHeader />
            <TableBody>
              {actionPoints &&
                actionPoints.edges.map(({ node }) => <ActionPointView key={node.id} actionPoint={node} onActionPointClick={onActionPointClick} />)}
            </TableBody>
          </Table>
        </div>
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateActionPointClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

ActionPointsView.propTypes = {
  onCreateActionPointClick: PropTypes.func.isRequired,
  onActionPointClick: PropTypes.func.isRequired,
};

export default createFragmentContainer(ActionPointsView, {
  user: graphql`
    fragment ActionPointsView_user on User {
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            actionPoints(first: 1000, msopId: $selectedMSOPId) @connection(key: "User_actionPoints") @include(if: $isMSOPSelected) {
              edges {
                node {
                  ...ActionPointView_actionPoint
                }
              }
            }
          }
        }
      }
    }
  `,
});
