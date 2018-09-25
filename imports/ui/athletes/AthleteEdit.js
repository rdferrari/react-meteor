import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { Athletes } from "../../api/athletes";

export default class AthleteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
    Meteor.call("athletes.update", this.props.athlete._id, {
      name
    });
  }

  render() {
    return (
      <div>
        <input
          defaultValue={this.props.athlete.name}
          placeholder="Athlete Name"
          onChange={this.handleNameChange.bind(this)}
        />
      </div>
    );
  }
}
