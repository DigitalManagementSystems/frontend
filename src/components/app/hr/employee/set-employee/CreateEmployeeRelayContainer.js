import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import SetEmployeeContainer from './SetEmployeeContainer';

export default createFragmentContainer(SetEmployeeContainer, {
  user: graphql`
    fragment CreateEmployeeRelayContainer_user on User {
      id
      registeredUsers(first: 1000) @connection(key: "User_registeredUsers") {
        edges {
          node {
            id
            email
          }
        }
      }
    }
  `,
});
