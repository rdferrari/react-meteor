import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Athletes } from "../../api/athletes";
import Athlete from "./Athlete.js";

class AthleteList extends Component {
  renderAthletes() {
    return this.props.athletes.map(athlete => {
      const currentUserId =
        this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = athlete.owner === currentUserId;
      const showDeleteButton = athlete.owner === currentUserId;

      return (
        <Athlete
          key={athlete._id}
          athlete={athlete}
          showPrivateButton={showPrivateButton}
          showDeleteButton={showDeleteButton}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <ul>{this.renderAthletes()}</ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("athletes");

  return {
    athletes: Athletes.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(AthleteList);
