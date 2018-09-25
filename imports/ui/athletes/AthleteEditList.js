import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Athletes } from "../../api/athletes";
import AthleteEdit from "./AthleteEdit.js";

class AthleteEditList extends Component {
  renderAthletesEdit() {
    return this.props.athletes.map(athlete => {
      const currentUserId =
        this.props.currentUser && this.props.currentUser._id;

      return <AthleteEdit key={athlete._id} athlete={athlete} />;
    });
  }

  render() {
    return (
      <div>
        <ul>{this.renderAthletesEdit()}</ul>
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
})(AthleteEditList);
