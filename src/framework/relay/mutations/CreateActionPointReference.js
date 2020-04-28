import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateActionPointReferenceMutation($input: CreateActionPointReferenceInput!) {
    createActionPointReference(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_actionPointReferences');

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
      const payload = store.getRootField('createActionPointReference');
      const newEdge = payload.getLinkedRecord('actionPointReference');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a ActionPointReference record in our store with a temporary ID
      const id = 'client:newActionPointReference:' + cuid();
      const node = store.create(id, 'ActionPointReference');

      node.setValue(id, 'id');
      node.setValue(name, 'name');

      // Create a new edge that contains the newly created ActionPointReference record
      const newEdge = store.create('client:newEdge:' + cuid(), 'ActionPointReference');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's actionPointReference list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createActionPointReference.actionPointReference ? response.createActionPointReference.actionPointReference.node : null);
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
