import { Map } from 'immutable';
import ActionTypes from './ActionTypes';
import initialState from './InitialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.NOTIFICATION_ADD_NOTIFICATION:
      return state.setIn(
        ['notifications', action.payload.get('id')],
        Map({ message: action.payload.get('message'), type: action.payload.get('type') }),
      );

    case ActionTypes.NOTIFICATION_REMOVE_NOTIFICATION:
      return state.deleteIn(['notifications', action.payload.get('id')]);

    default:
      return state;
  }
};

export default reducer;
