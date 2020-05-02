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

const getOptimisticResponse = (id, { meetingName, agendas }, user) => {
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
        id,
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
    optimisticResponse: getOptimisticResponse(id, { meetingName, agendas }, user),
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
