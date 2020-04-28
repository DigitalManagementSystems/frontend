import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateEmployeeMutation($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_employees');

  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

const commit = (
  environment,
  { employeeReference, position, mobile, userId, departmentIds, reportingToEmployeeId, manufacturerId },
  user,
  { onSuccess, onError } = {},
) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        userId,
        employeeReference,
        position,
        mobile,
        departmentIds,
        reportingToEmployeeId,
        manufacturerId,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('createEmployee');
      const newEdge = payload.getLinkedRecord('employee');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a Employee record in our store with a temporary ID
      const id = 'client:newEmployee:' + cuid();
      const node = store.create(id, 'Employee');

      node.setValue(id, 'id');
      node.setValue(employeeReference, 'employeeReference');

      // Create a new edge that contains the newly created Employee record
      const newEdge = store.create('client:newEdge:' + cuid(), 'Employee');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's employee list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createEmployee.employee ? response.createEmployee.employee.node : null);
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
