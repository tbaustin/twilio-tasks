import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';
import { Authenticate } from '../view';

class Account extends Component {
  login(credentials) {
    console.log('login ' + JSON.stringify(credentials));
  }

  register(credentials) {
    this.props.register(credentials);
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
  };
};

export default connect(stateToProps, dispatchToProps)(Account);
