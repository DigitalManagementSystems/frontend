import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateActionPointMutation($input: UpdateActionPointInput!) {
    updateActionPoint(input: $input) {
      clientMutationId
    }
  }
`;

const getOptimisticResponse = (id, { assignedDate, dueDate, comments }, user) => {
  if (!user) {
    return {};
  }

  return {
    updateActionPoint: {
      user: {
        id: user.id,
        actionPoint: {
          node: {
            id,
            assignedDate,
            dueDate,
            comments,
          },
        },
      },
    },
  };
};

const commit = (
  environment,
  { id, manufacturerId, msopId, assigneeId, departmentId, assignedDate, dueDate, priorityId, statusId, actionReferenceIds, comments },
  user,
  { onSuccess, onError } = {},
) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
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
    optimisticResponse: getOptimisticResponse(id, { assignedDate, dueDate, comments }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateActionPoint.actionPoint ? response.updateActionPoint.actionPoint.node : null);
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
