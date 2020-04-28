import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import SetEmployeeContainer from './SetEmployeeContainer';

export default createFragmentContainer(SetEmployeeContainer, {
  user: graphql`
    fragment UpdateEmployeeRelayContainer_user on User {
      id
      registeredUsers(first: 1000) @connection(key: "User_registeredUsers") {
        edges {
          node {
            id
            email
          }
        }
      }
      departments(first: 1000) @connection(key: "User_departments") {
        edges {
          node {
            id
            name
          }
        }
      }
      employees(first: 1000) @connection(key: "User_employees") {
        edges {
          node {
            id
            user {
              email
            }
          }
        }
      }
      employee(employeeId: $employeeId) {
        id
        employeeReference
        position
        mobile
        reportingToEmployee {
          id
          user {
            email
          }
        }
        user {
          id
          email
        }
        departments {
          id
          name
        }
      }
    }
  `,
});
