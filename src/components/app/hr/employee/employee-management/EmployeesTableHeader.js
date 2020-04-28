import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation } from 'react-i18next';

const EmployeesTableHeader = ({ t }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell>{t('email.title')}</TableCell>
      <TableCell>{t('employeeReference.title')}</TableCell>
      <TableCell>{t('position.title')}</TableCell>
      <TableCell>{t('mobile.title')}</TableCell>
      <TableCell>{t('departments.title')}</TableCell>
      <TableCell>{t('reportingTo.title')}</TableCell>
    </TableRow>
  </TableHead>
);

export default withTranslation()(EmployeesTableHeader);
