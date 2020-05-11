import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation } from 'react-i18next';

const ActionPointTableHeader = ({ t }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell>{t('assignedDate.title')}</TableCell>
    </TableRow>
  </TableHead>
);

export default withTranslation()(ActionPointTableHeader);
