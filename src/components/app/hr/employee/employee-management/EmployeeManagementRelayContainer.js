import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import EmployeeManagementContainer from './EmployeeManagementContainer';

export default createFragmentContainer(EmployeeManagementContainer, {
  user: graphql`
    fragment EmployeeManagementRelayContainer_user on User {
      id
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            employees(first: 1000, employeeIds: $employeeIds) @connection(key: "User_employees") {
              edges {
                node {
                  id
                  employeeReference
                  position
                  mobile
                  user {
                    email
                  }
                  reportingToEmployee {
                    id
                    user {
                      email
                    }
                  }
                  departments {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
});
