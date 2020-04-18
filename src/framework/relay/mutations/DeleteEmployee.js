import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation DeleteEmployeeMutation($input: DeleteEmployeeInput!) {
    deleteEmployee(input: $input) {
      deletedEmployeeId
    }
  }
`;

const sharedUpdater = (store, user, id) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_employees');

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
      const payload = store.getRootField('deleteEmployee');
      const deletedEmployeeID = payload.getValue('deletedEmployeeID');

      sharedUpdater(store, user, deletedEmployeeID);
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
