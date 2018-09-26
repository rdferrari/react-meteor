import React, { Component } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
      <Link to="/register">
        <p>Register</p>
      </Link>
    </div>
  );
};

export default Header;
