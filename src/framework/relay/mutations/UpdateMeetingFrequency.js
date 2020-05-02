import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateMeetingFrequencyMutation($input: UpdateMeetingFrequencyInput!) {
    updateMeetingFrequency(input: $input) {
      clientMutationId
    }
  }
`;

const getOptimisticResponse = (id, { name }, user) => {
  if (!user) {
    return {};
  }

  return {
    updateMeetingFrequency: {
      user: {
        id: user.id,
        meetingFrequency: {
          node: {
            id,
            name,
          },
        },
      },
    },
  };
};

const commit = (environment, { id, name, manufacturerId }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
        name,
        manufacturerId,
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

      onSuccess(response.updateMeetingFrequency.meetingFrequency ? response.updateMeetingFrequency.meetingFrequency.node : null);
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
