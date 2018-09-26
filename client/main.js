import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import App from "../imports/ui/App.js";
import AppRoutes from "../imports/AppRoutes.js";

Meteor.startup(() => {
  render(<AppRoutes />, document.getElementById("render-target"));
});
