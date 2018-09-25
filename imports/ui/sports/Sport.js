import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { withTracker } from "meteor/react-meteor-data";

import { Sports } from "../../api/sports.js";

class Sport extends Component {
  deleteThisSport() {
    Meteor.call("sports.remove", this.props.sport._id);
  }

  togglePrivate() {
    Meteor.call(
      "sports.setPrivate",
      this.props.sport._id,
      !this.props.sport.private
    );
  }

  render() {
    const sportClassName = classnames({
      private: this.props.sport.private
    });

    return (
      <li className={sportClassName}>
        <div>
          <p>
            {this.props.sport.profile}´s profile: {this.props.sport.title} --{" "}
            {this.props.sport._id}
          </p>
        </div>

        {this.props.showDeleteButton ? (
          <button className="delete" onClick={this.deleteThisSport.bind(this)}>
            delete
          </button>
        ) : (
          ""
        )}

        {this.props.showPrivateButton ? (
          <button onClick={this.togglePrivate.bind(this)}>
            {this.props.sport.private ? "Private" : "Public"}
          </button>
        ) : (
          ""
        )}
      </li>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("sports");

  return {
    currentUser: Meteor.user()
  };
})(Sport);
