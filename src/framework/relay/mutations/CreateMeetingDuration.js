import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateMeetingDurationMutation($input: CreateMeetingDurationInput!) {
    createMeetingDuration(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_meetingDurations');

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
      const payload = store.getRootField('createMeetingDuration');
      const newEdge = payload.getLinkedRecord('meetingDuration');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a MeetingDuration record in our store with a temporary ID
      const id = 'client:newMeetingDuration:' + cuid();
      const node = store.create(id, 'MeetingDuration');

      node.setValue(id, 'id');
      node.setValue(name, 'name');

      // Create a new edge that contains the newly created MeetingDuration record
      const newEdge = store.create('client:newEdge:' + cuid(), 'MeetingDuration');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's meetingDuration list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createMeetingDuration.meetingDuration ? response.createMeetingDuration.meetingDuration.node : null);
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
