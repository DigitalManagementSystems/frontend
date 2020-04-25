import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import SetDepartmentContainer from './SetDepartmentContainer';

export default createFragmentContainer(SetDepartmentContainer, {
  user: graphql`
    fragment UpdateDepartmentRelayContainer_user on User {
      id
      department(departmentId: $departmentId) {
        id
        name
        description
        manufacturer {
          id
        }
      }
    }
  `,
});
