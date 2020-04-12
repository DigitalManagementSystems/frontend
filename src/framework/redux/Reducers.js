import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';

export default function getReducers() {
  return combineReducers({
    form: formReducer,
    firebase: firebaseReducer,
  });
}
