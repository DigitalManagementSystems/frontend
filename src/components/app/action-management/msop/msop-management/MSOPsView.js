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
import MSOPTableHeader from './MSOPTableHeader';
import MSOPView from './MSOPView';

export const MSOPsView = ({ user, onCreateMSOPClick, onMSOPClick }) => {
  const classes = Styles();
  const msops = user.manufacturers.edges[0].node.msops;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <MSOPTableHeader />
            <TableBody>
              {msops.edges.map(({ node }) => (
                <MSOPView key={node.id} msop={node} onMSOPClick={onMSOPClick} />
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
  onCreateMSOPClick: PropTypes.func.isRequired,
  onMSOPClick: PropTypes.func.isRequired,
};

export default createFragmentContainer(MSOPsView, {
  user: graphql`
    fragment MSOPsView_user on User {
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            msops(first: 1000) @connection(key: "User_msops") {
              edges {
                node {
                  id
                  ...MSOPView_msop
                }
              }
            }
          }
        }
      }
    }
  `,
});
