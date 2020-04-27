import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateManufacturerMutation($input: CreateManufacturerInput!) {
    createManufacturer(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_manufacturers');

  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

const commit = (environment, { name }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('createManufacturer');
      const newEdge = payload.getLinkedRecord('manufacturer');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a Manufacturer record in our store with a temporary ID
      const id = 'client:newManufacturer:' + cuid();
      const node = store.create(id, 'Manufacturer');

      node.setValue(id, 'id');
      node.setValue(name, 'name');

      // Create a new edge that contains the newly created Manufacturer record
      const newEdge = store.create('client:newEdge:' + cuid(), 'Manufacturer');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's manufacturer list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createManufacturer.manufacturer ? response.createManufacturer.manufacturer.node : null);
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
