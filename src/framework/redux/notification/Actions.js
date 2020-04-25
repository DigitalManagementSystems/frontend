import { Map } from 'immutable';
import cuid from 'cuid';
import ActionTypes from './ActionTypes';

const add = (message, type) => ({
  type: ActionTypes.NOTIFICATION_ADD_NOTIFICATION,
  payload: Map({
    id: cuid(),
    message,
    type,
  }),
});

const remove = (id) => ({
  type: ActionTypes.NOTIFICATION_REMOVE_NOTIFICATION,
  payload: Map({
    id,
  }),
});

export { add, remove };
