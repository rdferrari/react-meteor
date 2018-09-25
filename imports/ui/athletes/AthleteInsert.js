import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";

import { Athletes } from "../../api/athletes";

class AthleteInsert extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();

    Meteor.call("athletes.insert", name);

    Athletes.insert({
      name,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      profile: Meteor.userId().profile
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.nameInput).value = "";
  }

  render() {
    return (
      <div>
        {this.props.currentUser ? (
          <div>
            <input type="text" ref="nameInput" placeholder="New athlete" />
            <button onClick={this.handleSubmit.bind(this)}>Add Athlete</button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("athletes");

  return {
    currentUser: Meteor.user()
  };
})(AthleteInsert);
