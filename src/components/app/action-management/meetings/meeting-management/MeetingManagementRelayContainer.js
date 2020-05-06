import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import MeetingManagementContainer from './MeetingManagementContainer';

export default createFragmentContainer(MeetingManagementContainer, {
  user: graphql`
    fragment MeetingManagementRelayContainer_user on User {
      id
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            msops(first: 1000) @connection(key: "User_msops") {
              edges {
                node {
                  id
                  meetingName
                }
              }
            }
          }
        }
      }
    }
  `,
});
