import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import Styles from './Styles';

export const DepartmentView = ({ department: { id, name, description }, onDepartmentClick }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onDepartmentClick(id)}>
          {name}
        </Link>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {description}
      </TableCell>
    </TableRow>
  );
};

DepartmentView.propTypes = {
  onDepartmentClick: PropTypes.func.isRequired,
};

export default createFragmentContainer(DepartmentView, {
  department: graphql`
    fragment DepartmentView_department on Department {
      id
      name
      description
    }
  `,
});
