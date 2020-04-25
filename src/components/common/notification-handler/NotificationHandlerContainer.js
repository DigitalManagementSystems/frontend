import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Map } from 'immutable';

import * as firebaseActions from '../../../framework/redux/firebase/Actions';
import { NotificationType } from '../../../framework/redux/notification';
import * as notificationActions from '../../../framework/redux/notification/Actions';

export class NotificationHandlerContainer extends Component {
  state = {
    firebaseErrorOpen: false,
    firebaseErrorMessage: '',
    errorNotificationOpen: false,
    errorNotificationMessage: '',
    warningNotificationOpen: false,
    warningNotificationMessage: '',
    infoNotificationOpen: false,
    infoNotificationMessage: '',
    successNotificationOpen: false,
    successNotificationMessage: '',
  };

  static getDerivedStateFromProps = ({ firebaseErrorMessage, firebaseActions, notificationActions, notifications }) => {
    let errorNotificationMessage = '';
    let warningNotificationMessage = '';
    let infoNotificationMessage = '';
    let successNotificationMessage = '';

    notifications.keySeq().forEach((notificationId) => {
      const notification = notifications.get(notificationId);
      const notificationType = notification.get('type');
      const notificationMessage = notification.get('message');

      if (notificationType === NotificationType.ERROR) {
        errorNotificationMessage = errorNotificationMessage + '\n' + notificationMessage;
      } else if (notificationType === NotificationType.WARNING) {
        warningNotificationMessage = warningNotificationMessage + '\n' + notificationMessage;
      } else if (notificationType === NotificationType.INFO) {
        infoNotificationMessage = infoNotificationMessage + '\n' + notificationMessage;
      } else if (notificationType === NotificationType.SUCCESS) {
        successNotificationMessage = successNotificationMessage + '\n' + notificationMessage;
      }

      notificationActions.remove(notificationId);
    });

    let newState = Map();

    if (firebaseErrorMessage) {
      firebaseActions.clearFirebaseErrors();

      newState = newState.set('firebaseErrorOpen', true).set('firebaseErrorMessage', firebaseErrorMessage);
    }

    if (errorNotificationMessage) {
      newState = newState.set('errorNotificationOpen', true).set('errorNotificationMessage', errorNotificationMessage);
    }

    if (warningNotificationMessage) {
      newState = newState.set('warningNotificationOpen', true).set('warningNotificationMessage', warningNotificationMessage);
    }

    if (infoNotificationMessage) {
      newState = newState.set('infoNotificationOpen', true).set('infoNotificationMessage', infoNotificationMessage);
    }

    if (successNotificationMessage) {
      newState = newState.set('successNotificationOpen', true).set('successNotificationMessage', successNotificationMessage);
    }

    return newState.isEmpty() ? null : newState.toJS();
  };

  handleFirebaseErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ firebaseErrorOpen: false, firebaseErrorMessage: '' });
  };

  handleErrorNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ errorNotificationOpen: false, errorNotificationMessage: '' });
  };

  handleWarningNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ warningNotificationOpen: false, warningNotificationMessage: '' });
  };

  handleInfoNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ infoNotificationOpen: false, infoNotificationMessage: '' });
  };

  handleSuccessNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ successNotificationOpen: false, successNotificationMessage: '' });
  };

  render = () => {
    const {
      firebaseErrorOpen,
      firebaseErrorMessage,
      errorNotificationOpen,
      errorNotificationMessage,
      warningNotificationOpen,
      warningNotificationMessage,
      infoNotificationOpen,
      infoNotificationMessage,
      successNotificationOpen,
      successNotificationMessage,
    } = this.state;

    return (
      <div>
        {firebaseErrorMessage && (
          <Snackbar open={firebaseErrorOpen} autoHideDuration={6000} onClose={this.handleFirebaseErrorClose}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleFirebaseErrorClose} severity="error">
              {firebaseErrorMessage}
            </MuiAlert>
          </Snackbar>
        )}
        {errorNotificationMessage && (
          <Snackbar open={errorNotificationOpen} autoHideDuration={6000} onClose={this.handleErrorNotificationClose}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleErrorNotificationClose} severity="error">
              {errorNotificationMessage}
            </MuiAlert>
          </Snackbar>
        )}
        {warningNotificationMessage && (
          <Snackbar open={warningNotificationOpen} autoHideDuration={6000} onClose={this.handleWarningNotificationClose}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleWarningNotificationClose} severity="warning">
              {warningNotificationMessage}
            </MuiAlert>
          </Snackbar>
        )}
        {infoNotificationMessage && (
          <Snackbar open={infoNotificationOpen} autoHideDuration={6000} onClose={this.handleInfoNotificationClose}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleInfoNotificationClose} severity="info">
              {infoNotificationMessage}
            </MuiAlert>
          </Snackbar>
        )}
        {successNotificationMessage && (
          <Snackbar open={successNotificationOpen} autoHideDuration={6000} onClose={this.handleSuccessNotificationClose}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleSuccessNotificationClose} severity="success">
              {successNotificationMessage}
            </MuiAlert>
          </Snackbar>
        )}
      </div>
    );
  };
}

NotificationHandlerContainer.propTypes = {
  firebaseErrorMessage: PropTypes.string,
  firebaseActions: PropTypes.object.isRequired,
  notificationActions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  firebaseErrorMessage: state.firebase.errors
    .filter((error) => error !== null)
    .reduce((firebaseErrorMessage, error) => firebaseErrorMessage + '\n' + error.message, ''),
  notifications: state.notification.get('notifications'),
});

const mapDispatchToProps = (dispatch) => ({
  firebaseActions: bindActionCreators(firebaseActions, dispatch),
  notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationHandlerContainer);
