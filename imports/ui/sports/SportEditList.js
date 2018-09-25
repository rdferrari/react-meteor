import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Sports } from "../../api/sports";
import SportEdit from "./SportEdit.js";

class SportEditList extends Component {
  renderSportsEdit() {
    return this.props.sports.map(sport => {
      const currentUserId =
        this.props.currentUser && this.props.currentUser._id;

      return <SportEdit key={sport._id} sport={sport} />;
    });
  }

  render() {
    return (
      <div>
        <ul>{this.renderSportsEdit()}</ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("sports");

  return {
    sports: Sports.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(SportEditList);
