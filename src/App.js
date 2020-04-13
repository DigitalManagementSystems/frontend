import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import { createFirestoreInstance, ReactReduxFirebaseProvider } from 'react-redux-firebase';

import theme from './theme';
import './App.css';
import { reduxStore } from './framework/redux';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: reduxStore.dispatch,
  createFirestoreInstance,
};

const App = () => {
  return (
    <Provider store={reduxStore}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
