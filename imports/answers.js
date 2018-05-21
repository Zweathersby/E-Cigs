import {  Meteor  } from 'meteor/meteor';
import {  Mongo   } from 'meteor/mongo';
import {  check   } from 'meteor/check';

export const Answers = new Mongo.Collection('answers');
export const Results = new Mongo.Collection('results');
export const Patients = new Mongo.Collection('patients');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('answers', function answersPublication() {
    return Answers.find();
  });
  Meteor.publish('results', function resultsPublication() {
    return Results.find();
  });
  Meteor.publish('patients', function patientsPublication() {
    return Patients.find();
  });
}

Meteor.methods({
    'answers.insert' (input) {
        check(input, String);
        if(input !== ''){
          Answers.insert({
              input,
          });
        }
    },

    'answers.remove' (answerId) {
        Answers.remove(answerId);
    },

    'answers.reset' () {
        Answers.remove({});
    },

    'results.insert' (question, answer, patientID) {
        Results.insert({
            question,
            answer,
            patientID,
        });
    },

    'results.remove' (resultId) {
        check(resultId, String);
        Results.remove(resultId);
    },
    'results.reset' () {
        Results.remove({});
        Patients.remove({});
    },
    'patients.insert' (patient, physician) {
        var newPatient = Patients.insert({
          patient,
          physician,
        });
        return newPatient;
    },
});
