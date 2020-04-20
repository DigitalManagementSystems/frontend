import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import UpdateDepartmentContainer from './UpdateDepartmentContainer';

export default createFragmentContainer(UpdateDepartmentContainer, {
  user: graphql`
    fragment UpdateDepartmentRelayContainer_user on User {
      id
      department(departmentId: $departmentId) {
        id
        name
        description
      }
    }
  `,
});
