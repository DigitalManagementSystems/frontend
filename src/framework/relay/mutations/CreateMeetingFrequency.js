import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateMeetingFrequencyMutation($input: CreateMeetingFrequencyInput!) {
    createMeetingFrequency(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_meetingFrequencys');

  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

const commit = (environment, { name, manufacturerId }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        manufacturerId,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('createMeetingFrequency');
      const newEdge = payload.getLinkedRecord('meetingFrequency');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a MeetingFrequency record in our store with a temporary ID
      const id = 'client:newMeetingFrequency:' + cuid();
      const node = store.create(id, 'MeetingFrequency');

      node.setValue(id, 'id');
      node.setValue(name, 'name');

      // Create a new edge that contains the newly created MeetingFrequency record
      const newEdge = store.create('client:newEdge:' + cuid(), 'MeetingFrequency');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's meetingFrequency list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createMeetingFrequency.meetingFrequency ? response.createMeetingFrequency.meetingFrequency.node : null);
    },
    onError: ({ message: errorMessage }) => {
      if (!onError) {
        return;
      }

      onError(errorMessage);
    },
  });
};

export default commit;
