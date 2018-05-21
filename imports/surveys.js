import {  Meteor  } from 'meteor/meteor';
import {  Mongo   } from 'meteor/mongo';
import {  check   } from 'meteor/check';
import { Questions} from '/imports/questions.js';

export const Surveys = new Mongo.Collection('surveys');

Surveys.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true;
  },
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('surveys', function surveysPublication() {
    return Surveys.find({});
  });
}

Meteor.methods({
    // Questions: TF, Short, Slider
    'surveys.insert' (surveyName, count, createdAt) {
        check(surveyName, String);

        Surveys.insert({
            surveyName,
            count,
            createdAt: new Date(),
        });
    },
    'surveys.remove' (surveyId) {
        check(surveyId, String);
        // Remove selected question
        Surveys.remove(surveyId);
        Questions.remove({'surveyID': surveyId});
    },
});
