import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: window._env_.FIREBASE_API_KEY,
  authDomain: window._env_.FIREBASE_AUTH_DOMAIN,
  databaseURL: window._env_.FIREBASE_DATABASE_URL,
  projectId: window._env_.FIREBASE_PROJECT_ID,
  storageBucket: window._env_.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window._env_.FIREBASE_MESSAGING_SENDER_ID,
  appId: window._env_.FIREBASE_APP_ID,
  measurementId: window._env_.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.firestore();

if (!!firebaseConfig.measurementId) {
  firebase.analytics();
}
