import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import SetMSOPContainer from './SetMSOPContainer';

export default createFragmentContainer(SetMSOPContainer, {
  user: graphql`
    fragment CreateMSOPRelayContainer_user on User {
      id
      manufacturers(first: 1) @connection(key: "User_manufacturers") {
        edges {
          node {
            id
            meetingFrequencies(first: 1000) @connection(key: "User_meetingFrequencies") {
              edges {
                node {
                  id
                  name
                }
              }
            }
            meetingDays(first: 1000) @connection(key: "User_meetingDays") {
              edges {
                node {
                  id
                  name
                }
              }
            }
            meetingDurations(first: 1000) @connection(key: "User_meetingDurations") {
              edges {
                node {
                  id
                  name
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
          }
        }
      }
    }
  `,
});
