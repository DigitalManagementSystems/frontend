import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import SetDepartmentContainer from './SetDepartmentContainer';

export default createFragmentContainer(SetDepartmentContainer, {
  user: graphql`
    fragment UpdateDepartmentRelayContainer_user on User {
      id
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            department(departmentId: $departmentId) {
              id
              name
              description
            }
          }
        }
      }
    }
  `,
});
