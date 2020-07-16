import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

import getReducers from './Reducers';

const rootSagas = function* sagas() {
  yield all([]);
};

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(getReducers(), composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSagas);

export default store;
