import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Athletes } from "../api/athletes";
import { Sports } from "../api/sports";

import Header from "./Header";

import AthleteInsert from "./athletes/AthleteInsert";
import AthleteList from "./athletes/AthleteList";
import AthleteEditList from "./athletes/AthleteEditList";

import SportInsert from "./sports/SportInsert";
import SportList from "./sports/SportList";
import SportEditList from "./sports/SportEditList";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <header>
          <div>
            <button onClick={() => Meteor.logout()}>logout</button>
          </div>
        </header>

        <section>
          <h1>Athletes List</h1>
          <AthleteInsert />
          <AthleteList />
          <AthleteEditList />
        </section>

        <section>
          <h1>Sport List</h1>
          <SportInsert />
          <SportList />
          <SportEditList />
        </section>
      </div>
    );
  }
}
