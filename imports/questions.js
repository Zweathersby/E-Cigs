import {  Meteor  } from 'meteor/meteor';
import {  Mongo   } from 'meteor/mongo';
import {  check   } from 'meteor/check';

export const Questions = new Mongo.Collection('questions');
export const Presentation = new Mongo.Collection('presentation');

Sortable.collections = ['questions'];
Questions.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true;
  },
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('questions', function questionsPublication() {
    return Questions.find({}, {sort: {count: 1}});
  });
  Meteor.publish('presentation', function presentationPublication() {
    return Presentation.find({});
  });
}

Meteor.methods({
    // Questions: TF, Short, Slider
    'questions.insert' (question, option, count, surveyID) {
        check(question, String);
        check(option, String);

        Questions.insert({
            question,
            option,
            count,
            surveyID,
        });
    },
    'questions.remove' (questionId) {
        check(questionId, String);
        // Remove selected question
        Questions.remove(questionId);

        // Reorder questions to correct index
        let index = 0;
        Questions.find().map(function(q) {
          Questions.update(q._id, {
            $set: { count: index },
          });
          index++;
        });
    },

    // Questions: Multiple Choice
    'mcquestions.insert' (question, option, count, c1, c2, c3, surveyID) {
        check(question, String);

        Questions.insert({
            question,
            option,
            count,
            c1,
            c2,
            c3,
            surveyID
        });
    },

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
      Presentation.remove({});
    },
});
