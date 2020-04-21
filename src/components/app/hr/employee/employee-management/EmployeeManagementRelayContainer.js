import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import EmployeeManagementContainer from './EmployeeManagementContainer';

export default createFragmentContainer(EmployeeManagementContainer, {
  user: graphql`
    fragment EmployeeManagementRelayContainer_user on User {
      id
      employees(first: 1000, employeeIds: $employeeIds) @connection(key: "User_employees") {
        edges {
          node {
            id
            email
            employeeReference
          }
        }
      }
    }
  `,
});
