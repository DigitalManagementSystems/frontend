import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation DeleteMeetingDayMutation($input: DeleteMeetingDayInput!) {
    deleteMeetingDay(input: $input) {
      deletedMeetingDayId
    }
  }
`;

const sharedUpdater = (store, user, id) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_meetingDays');

  ConnectionHandler.deleteNode(connection, id);
};

const commit = (environment, { id }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('deleteMeetingDay');
      const deletedMeetingDayID = payload.getValue('deletedMeetingDayID');

      sharedUpdater(store, user, deletedMeetingDayID);
    },
    optimisticUpdater: (store) => {
      sharedUpdater(store, user, id);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess();
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
