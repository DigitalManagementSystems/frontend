import React from 'react';
import PropTypes from 'prop-types';
import { employeesProp } from './PropTypes';

const EmployeesView = ({ employees, onCreateEmployeeClick, onEmployeeClick }) => {
  return (
    <div>
      <h1>Employees fields</h1>
    </div>
  );
};

EmployeesView.propTypes = {
  employees: employeesProp.isRequired,
  onCreateEmployeeClick: PropTypes.func.isRequired,
  onEmployeeClick: PropTypes.func.isRequired,
};

export default EmployeesView;
