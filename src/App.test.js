import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const window = global;
window._env_ = {
  API_GATEWAY_PUBLIC_URL: '/graphql',
  FIREBASE_API_KEY: 'AIzaSyC4LqA-1IdxNSoeX67N8PFvwKCVyKjtiCs',
  FIREBASE_AUTH_DOMAIN: 'dms-frontend-morteza.firebaseapp.com',
  FIREBASE_DATABASE_URL: 'https://dms-frontend-morteza.firebaseio.com',
  FIREBASE_PROJECT_ID: 'dms-frontend-morteza',
  FIREBASE_STORAGE_BUCKET: 'dms-frontend-morteza.appspot.com',
  FIREBASE_MESSAGING_SENDER_ID: '453569070442',
  FIREBASE_APP_ID: '1:453569070442:web:a1e2f6348727f3393e5113',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
