import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import { createFirestoreInstance, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';
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
    <I18nextProvider i18n={i18n}>
      <Provider store={reduxStore}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
              <Routes />
            </Router>
          </ThemeProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
