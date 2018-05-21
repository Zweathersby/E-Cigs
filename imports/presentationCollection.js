import {  Meteor  } from 'meteor/meteor';
import {  Mongo   } from 'meteor/mongo';

export const Presentation = new Mongo.Collection('presentation');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('presentation', function presentationPublication() {
    return Presentation.find({});
  });
}

Meteor.methods({
    'presentation.insert' (iframe) {
        Presentation.insert({
            iframe,
        });
    },

    'presentation.update' (slides) {
      Presentation.update(this._id, {
        $set: {iframe: slides},
      });
    },
    'presentation.reset' () {
        Results.remove({});
    },
});
