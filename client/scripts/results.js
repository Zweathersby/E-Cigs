import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '/imports/questions.js';
import { Results } from '/imports/answers.js';
import { Patients } from '/imports/answers.js';

import '../views/question.js';
import '../views/results.html';

Template.results.onCreated(function resultsOnCreated() {
    this.state = new ReactiveDict();
    // let patientID = Router.current().params._id;
    Meteor.subscribe('questions');
    Meteor.subscribe('results');
    Meteor.subscribe('patients');
});

Template.results.helpers({
    patients() {
      return Patients.find({});
    },
    results (patientID) {
      return Results.find({'patientID': patientID});
    },
    offset: function(index){
        return ++index;
    },
});

Template.results.events({
  'click #resultsbtn' (event) {
      Meteor.call('results.reset');
  },
});
