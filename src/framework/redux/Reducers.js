import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import { NotificationReducer } from './notification';

const getReducers = () =>
  combineReducers({
    form: formReducer,
    firebase: firebaseReducer,
    notification: NotificationReducer,
  });

export default getReducers;
