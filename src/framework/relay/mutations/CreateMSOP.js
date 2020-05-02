import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateMSOPMutation($input: CreateMSOPInput!) {
    createMSOP(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_msops');

  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

const commit = (
  environment,
  {
    manufacturerId,
    meetingName,
    durationId,
    frequencyId,
    agendas,
    meetingDayIds,
    departmentId,
    chairPersonEmployeeId,
    actionLogSecretaryEmployeeId,
    attendeeIds,
  },
  user,
  { onSuccess, onError } = {},
) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        manufacturerId,
        meetingName,
        durationId,
        frequencyId,
        agendas,
        meetingDayIds,
        departmentId,
        chairPersonEmployeeId,
        actionLogSecretaryEmployeeId,
        attendeeIds,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('createMSOP');
      const newEdge = payload.getLinkedRecord('msop');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a MSOP record in our store with a temporary ID
      const id = 'client:newMSOP:' + cuid();
      const node = store.create(id, 'MSOP');

      node.setValue(id, 'id');
      node.setValue(meetingName, 'meetingName');
      node.setValue(agendas, 'agendas');

      // Create a new edge that contains the newly created MSOP record
      const newEdge = store.create('client:newEdge:' + cuid(), 'MSOP');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's msop list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createMSOP.msop ? response.createMSOP.msop.node : null);
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
