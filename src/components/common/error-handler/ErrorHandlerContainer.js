import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export class ErrorHandlerContainer extends Component {
  state = { open: false, errorMessage: '' };

  static getDerivedStateFromProps = ({ errorMessage, clearFirebaseErrors }) => {
    if (errorMessage) {
      clearFirebaseErrors();

      return { open: true, errorMessage };
    }

    return null;
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false, errorMessage: '' });
  };

  render = () => {
    const { errorMessage, open } = this.state;

    return (
      <div>
        {errorMessage && (
          <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
              {errorMessage}
            </MuiAlert>
          </Snackbar>
        )}
      </div>
    );
  };
}

ErrorHandlerContainer.propTypes = {
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  errorMessage: state.firebase.errors.filter((error) => error !== null).reduce((errorMessage, error) => error.message, ''),
});

const clearFirebaseErrors = () => ({
  type: '@@reactReduxFirebase/CLEAR_ERRORS',
});

export default connect(mapStateToProps, { clearFirebaseErrors })(ErrorHandlerContainer);
