import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateDepartmentMutation($input: UpdateDepartmentInput!) {
    updateDepartment(input: $input) {
      department {
        __typename
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const getOptimisticResponse = (id, { name, description }, user) => {
  if (!user) {
    return {};
  }

  return {
    updateDepartment: {
      user: {
        id: user.id,
        department: {
          node: {
            id,
            name,
            description,
          },
        },
      },
    },
  };
};

const commit = (environment, { id, name, description }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
        name,
        description,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(id, { name, description }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateDepartment.department.node);
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
