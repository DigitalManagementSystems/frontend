import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import MSOPManagementContainer from './MSOPManagementContainer';

export default createFragmentContainer(MSOPManagementContainer, {
  user: graphql`
    fragment MSOPManagementRelayContainer_user on User {
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
                  meetingDuration
                  frequency {
                    id
                    name
                  }
                  meetingDays {
                    id
                    name
                  }
                  agendas
                  department {
                    name
                  }
                  chairPersonEmployee {
                    user {
                      email
                    }
                  }
                  actionLogSecretaryEmployee {
                    user {
                      email
                    }
                  }
                  attendees {
                    user {
                      email
                    }
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
