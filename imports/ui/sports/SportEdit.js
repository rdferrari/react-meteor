import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { Sports } from "../../api/sports";

export default class SportEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  handleNameChange(e) {
    const title = e.target.value;
    this.setState({ title });
    Meteor.call("sports.update", this.props.sport._id, {
      title
    });
  }

  render() {
    return (
      <div>
        <input
          defaultValue={this.props.sport.title}
          placeholder="Sport title"
          onChange={this.handleNameChange.bind(this)}
        />
      </div>
    );
  }
}
