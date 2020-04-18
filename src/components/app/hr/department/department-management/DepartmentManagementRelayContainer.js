import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import DepartmentManagementContainer from './DepartmentManagementContainer';

export default createFragmentContainer(DepartmentManagementContainer, {
  user: graphql`
    fragment DepartmentManagementRelayContainer_user on User {
      id
      departments(first: 1000, departmentIds: $departmentIds) @connection(key: "User_departments") {
        edges {
          node {
            id
            name
            description
          }
        }
      }
    }
  `,
});
