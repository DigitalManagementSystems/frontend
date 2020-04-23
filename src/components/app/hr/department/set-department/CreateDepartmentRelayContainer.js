import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import SetDepartmentContainer from './SetDepartmentContainer';

export default createFragmentContainer(SetDepartmentContainer, {
  user: graphql`
    fragment CreateDepartmentRelayContainer_user on User {
      id
      manufacturers(first: 1000) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
          }
        }
      }
    }
  `,
});
