import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation } from 'react-i18next';

const MSOPsTableHeader = ({ t }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell>{t('meetingName.title')}</TableCell>
      <TableCell>{t('meetingDuration.title')}</TableCell>
      <TableCell>{t('meetingFrequency.title')}</TableCell>
      <TableCell>{t('meetingDays.title')}</TableCell>
      <TableCell>{t('department.title')}</TableCell>
      <TableCell>{t('chairPerson.title')}</TableCell>
      <TableCell>{t('secretary.title')}</TableCell>
      <TableCell>{t('attendees.title')}</TableCell>
      <TableCell>{t('agendas.title')}</TableCell>
    </TableRow>
  </TableHead>
);

export default withTranslation()(MSOPsTableHeader);
