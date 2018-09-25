import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Sports = new Mongo.Collection("sports");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("sports", function sportsPublication() {
    return Sports.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }]
    });
  });
}

Meteor.methods({
  "sports.insert"(title, athleteId) {
    check(title, String);
    check(athleteId, String);

    // Make sure the user is logged in before inserting a sport
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Sports.insert({
      title,
      athleteId,
      createdAt: new Date(),
      owner: this.userId,
      profile: Meteor.users.findOne(this.userId).profile
    });
  },

  "sports.remove"(sportId) {
    check(sportId, String);

    const sport = Sports.findOne(sportId);
    if (sport.private && sport.owner !== this.userId) {
      // If the sport is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }

    Sports.remove(sportId);
  },

  "sports.setPrivate"(sportId, setToPrivate) {
    check(sportId, String);
    check(setToPrivate, Boolean);

    const sport = Sports.findOne(sportId);

    // Make sure only the sport owner can make a sport private
    if (sport.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Sports.update(sportId, { $set: { private: setToPrivate } });
  },

  "sports.update"(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Sports.update(
      { _id, owner: this.userId },
      {
        $set: {
          ...updates
        }
      }
    );
  }
});
