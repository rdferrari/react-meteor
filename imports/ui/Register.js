import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";

import Header from "./Header";

export default class Register extends Component {
  registerUser = e => {
    e.preventDefault();
    Accounts.createUser({
      profile: this.profile.value,
      email: this.email.value,
      password: this.password.value
    });
  };

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.registerUser}>
          <input type="text" ref={input => (this.profile = input)} />
          <input type="email" ref={input => (this.email = input)} />
          <input type="password" ref={input => (this.password = input)} />
          <button type="submit">Register User</button>
        </form>
      </div>
    );
  }
}
