import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { withTracker } from "meteor/react-meteor-data";

import { Athletes } from "../../api/athletes.js";

import { Sports } from "../../api/sports";
import SportInsert from "../sports/SportInsert";

class Athlete extends Component {
  deleteThisAthlete() {
    Meteor.call("athletes.remove", this.props.athlete._id);
  }

  togglePrivate() {
    Meteor.call(
      "athletes.setPrivate",
      this.props.athlete._id,
      !this.props.athlete.private
    );
  }

  render() {
    const athleteClassName = classnames({
      private: this.props.athlete.private
    });

    return (
      <li className={athleteClassName}>
        <div>
          <p>
            {this.props.athlete.profile}´s profile: {this.props.athlete.name} --{" "}
            {this.props.athlete._id}
          </p>
        </div>

        {this.props.showDeleteButton ? (
          <button
            className="delete"
            onClick={this.deleteThisAthlete.bind(this)}
          >
            delete
          </button>
        ) : (
          ""
        )}

        {this.props.showPrivateButton ? (
          <button onClick={this.togglePrivate.bind(this)}>
            {this.props.athlete.private ? "Private" : "Public"}
          </button>
        ) : (
          ""
        )}
        <SportInsert athleteId={this.props.athlete._id} />
      </li>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("sports");

  return {
    currentUser: Meteor.user()
  };
})(Athlete);
