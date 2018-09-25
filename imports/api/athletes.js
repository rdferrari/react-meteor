import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Athletes = new Mongo.Collection("athletes");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("athletes", function athletesPublication() {
    return Athletes.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }]
    });
  });
}

Meteor.methods({
  "athletes.insert"(name) {
    check(name, String);

    // Make sure the user is logged in before inserting a athlete
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Athletes.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      profile: Meteor.users.findOne(this.userId).profile
    });
  },

  "athletes.remove"(athleteId) {
    check(athleteId, String);

    const athlete = Athletes.findOne(athleteId);
    if (athlete.private && athlete.owner !== this.userId) {
      // If the athlete is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }

    Athletes.remove(athleteId);
  },

  "athletes.setPrivate"(athleteId, setToPrivate) {
    check(athleteId, String);
    check(setToPrivate, Boolean);

    const athlete = Athletes.findOne(athleteId);

    // Make sure only the athlete owner can make a athlete private
    if (athlete.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Athletes.update(athleteId, { $set: { private: setToPrivate } });
  },

  "athletes.update"(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Athletes.update(
      { _id, owner: this.userId },
      {
        $set: {
          ...updates
        }
      }
    );
  }
});
