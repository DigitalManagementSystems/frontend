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
          name {
            firstName
            middleName
            lastName
            preferredName
          }
          departments {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
            edges {
              cursor
              node {
                id
                name
                description
              }
            }
          }
        }
      }
    }
  }
`;

const getOptimisticResponse = (id, { name, departmentIds }, user) => {
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
            name,
          },
        },
      },
    },
  };
};

const commit = (environment, { id, name, departmentIds }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
        name,
        departmentIds,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(id, { name }, user),
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
