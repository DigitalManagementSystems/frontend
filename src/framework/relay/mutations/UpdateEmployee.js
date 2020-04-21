import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateEmployeeMutation($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      employee {
        __typename
        cursor
        node {
          id
          email
          employeeReference
          departments {
            id
            name
            description
          }
        }
      }
    }
  }
`;

const getOptimisticResponse = (id, { email, employeeReference, departmentIds }, user) => {
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
            email,
            employeeReference,
          },
        },
      },
    },
  };
};

const commit = (environment, { id, email, employeeReference, departmentIds }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
        email,
        employeeReference,
        departmentIds,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(id, { email, employeeReference, departmentIds }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateEmployee.employee.node);
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
