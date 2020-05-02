import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateActionPointMutation($input: CreateActionPointInput!) {
    createActionPoint(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_actionPoints');

  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

const commit = (
  environment,
  { manufacturerId, msopId, assigneeId, departmentId, assignedDate, dueDate, priorityId, statusId, actionReferenceIds, comments },
  user,
  { onSuccess, onError } = {},
) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        manufacturerId,
        msopId,
        assigneeId,
        departmentId,
        assignedDate,
        dueDate,
        priorityId,
        statusId,
        actionReferenceIds,
        comments,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('createActionPoint');
      const newEdge = payload.getLinkedRecord('actionPoint');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a ActionPoint record in our store with a temporary ID
      const id = 'client:newActionPoint:' + cuid();
      const node = store.create(id, 'ActionPoint');

      node.setValue(id, 'id');
      node.setValue(assignedDate, 'assignedDate');
      node.setValue(dueDate, 'dueDate');
      node.setValue(comments, 'comments');

      // Create a new edge that contains the newly created ActionPoint record
      const newEdge = store.create('client:newEdge:' + cuid(), 'ActionPoint');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's actionPoint list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createActionPoint.actionPoint ? response.createActionPoint.actionPoint.node : null);
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
