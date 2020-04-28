import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateMSOPMutation($input: UpdateMSOPInput!) {
    updateMSOP(input: $input) {
      clientMutationId
    }
  }
`;

const getOptimisticResponse = (id, { meetingName, meetingDuration, frequency, agendas }, user) => {
  if (!user) {
    return {};
  }

  return {
    updateMSOP: {
      user: {
        id: user.id,
        msop: {
          node: {
            id,
            meetingName,
            meetingDuration,
            frequency,
            agendas,
          },
        },
      },
    },
  };
};

const commit = (
  environment,
  {
    id,
    manufacturerId,
    meetingName,
    meetingDuration,
    frequency,
    agendas,
    meetingDays,
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
        id,
        manufacturerId,
        meetingName,
        meetingDuration,
        frequency,
        agendas,
        meetingDays,
        departmentId,
        chairPersonEmployeeId,
        actionLogSecretaryEmployeeId,
        attendeeIds,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(id, { meetingName, meetingDuration, frequency, agendas }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateMSOP.msop ? response.updateMSOP.msop.node : null);
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
