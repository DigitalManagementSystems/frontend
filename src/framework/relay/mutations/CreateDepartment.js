import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateDepartmentMutation($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_departments');

  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

const commit = (environment, { name, description, manufacturerId }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        description,
        manufacturerId,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('createDepartment');
      const newEdge = payload.getLinkedRecord('department');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a Department record in our store with a temporary ID
      const id = 'client:newDepartment:' + cuid();
      const node = store.create(id, 'Department');

      node.setValue(id, 'id');
      node.setValue(name, 'name');
      node.setValue(name, 'description');

      // Create a new edge that contains the newly created Department record
      const newEdge = store.create('client:newEdge:' + cuid(), 'Department');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's department list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createDepartment.department ? response.createDepartment.department.node : null);
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
