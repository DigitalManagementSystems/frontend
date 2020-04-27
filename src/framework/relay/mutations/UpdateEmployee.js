import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateEmployeeMutation($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      clientMutationId
    }
  }
`;

const getOptimisticResponse = (id, { employeeReference }, user) => {
  if (!user) {
    return {};
  }

  return {
    updateEmployee: {
      user: {
        id: user.id,
        employee: {
          node: {
            id,
            employeeReference,
          },
        },
      },
    },
  };
};

const commit = (
  environment,
  { id, employeeReference, position, mobile, userId, departmentIds, reportingToEmployeeId },
  user,
  { onSuccess, onError } = {},
) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
        userId,
        employeeReference,
        position,
        mobile,
        departmentIds,
        reportingToEmployeeId,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(id, { userId, employeeReference }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateEmployee.employee ? response.updateEmployee.employee.node : null);
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
