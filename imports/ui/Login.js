import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";

import Header from "./Header";

export default class Login extends Component {
  login = e => {
    e.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value);
  };

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.login}>
          <input type="email" ref={input => (this.email = input)} />
          <input type="password" ref={input => (this.password = input)} />
          <button type="submit">Login User</button>
        </form>
      </div>
    );
  }
}
