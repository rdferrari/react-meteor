import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Sports } from "../../api/sports";
import Sport from "./Sport.js";

class SportList extends Component {
  renderSports() {
    return this.props.sports.map(sport => {
      const currentUserId =
        this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = sport.owner === currentUserId;
      const showDeleteButton = sport.owner === currentUserId;

      return (
        <Sport
          key={sport._id}
          sport={sport}
          showPrivateButton={showPrivateButton}
          showDeleteButton={showDeleteButton}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <ul>{this.renderSports()}</ul>
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
})(SportList);
