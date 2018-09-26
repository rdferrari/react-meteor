import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from "./ui/App";
import Login from "./ui/Login";
import Register from "./ui/Register";

const AppRoutes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
);

export default AppRoutes;
