import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";

import { Sports } from "../../api/sports";

class SportInsert extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const athleteId = ReactDOM.findDOMNode(
      this.refs.athleteIdInput
    ).value.trim();

    Meteor.call("sports.insert", title, athleteId);

    Sports.insert({
      title,
      athleteId,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      profile: Meteor.userId().profile
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.titleInput).value = "";
    ReactDOM.findDOMNode(this.refs.athleteIdInput).value = "";
  }

  render() {
    return (
      <div>
        {this.props.currentUser ? (
          <div>
            <input type="text" ref="titleInput" placeholder="New sport" />
            <input
              type="hidden"
              ref="athleteIdInput"
              value={this.props.athleteId}
            />
            <button onClick={this.handleSubmit.bind(this)}>Add Sport</button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("sports");

  return {
    currentUser: Meteor.user()
  };
})(SportInsert);
