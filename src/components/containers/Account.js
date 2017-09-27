import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';
import { Authenticate } from '../view';

class Account extends Component {
  login(credentials) {
    this.props
      .login(credentials)
      .then(response => {})
      .catch(err => {
        alert(err);
      });
  }

  register(credentials) {
    this.props
      .register(credentials)
      .then(response => {})
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Account</h2>
        <Authenticate
          onLogin={this.login.bind(this)}
          onRegister={this.register.bind(this)}
        />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.account.user,
  };
};

const dispatchToProps = dispatch => {
  return {
    register: credentials => dispatch(actions.register(credentials)),
    login: credentials => dispatch(actions.login(credentials)),
  };
};

export default connect(stateToProps, dispatchToProps)(Account);
