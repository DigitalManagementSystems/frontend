import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateDepartmentMutation($input: UpdateDepartmentInput!) {
    updateDepartment(input: $input) {
      clientMutationId
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

const commit = (environment, { id, name, description, manufacturerId }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
        name,
        description,
        manufacturerId,
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

      onSuccess(response.updateDepartment.department ? response.updateDepartment.department.node : null);
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
