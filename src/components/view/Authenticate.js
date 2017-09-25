import React, { Component } from 'react';

class Authenticate extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        username: '',
        phone: '',
        email: '',
        password: '',
      },
    };
  }

  updateCredentails(field, event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.credentials);
    updated[field] = event.target.value;
    this.setState({
      credentials: updated,
    });
  }

  register(event) {
    event.preventDefault();
    this.props.onRegister(this.state.credentials);
  }

  login(event) {
    event.preventDefault();
    this.props.onLogin(this.state.credentials);
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <input
          onChange={this.updateCredentails.bind(this, 'username')}
          type="text"
          placeholder="Username"
        />
        <br />
        <input
          onChange={this.updateCredentails.bind(this, 'phone')}
          type="text"
          placeholder="Phone"
        />
        <br />
        <input
          onChange={this.updateCredentails.bind(this, 'email')}
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          onChange={this.updateCredentails.bind(this, 'password')}
          type="password"
          placeholder="Password"
        />
        <br />
        <button onClick={this.register.bind(this)}>Join</button>

        <h3>Log In</h3>
        <input
          onChange={this.updateCredentails.bind(this, 'email')}
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          onChange={this.updateCredentails.bind(this, 'password')}
          type="password"
          placeholder="Password"
        />
        <br />
        <button onClick={this.login.bind(this)}>Login</button>
      </div>
    );
  }
}

export default Authenticate;
