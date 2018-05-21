import {  Meteor      } from 'meteor/meteor';
import {  Template    } from 'meteor/templating';
import { Presentation } from '/imports/questions.js';

import '../views/presentation.html';

Template.presentation.onCreated(function presentationOnCreated() {
    Meteor.subscribe('presentation');
});

Template.presentation.helpers({
    iframeInsert() {
      return Presentation.findOne({}).iframe;
    },
});

Template.presentation.events({
  'submit .presentation-form' (event) {
    event.preventDefault();

    Meteor.call('presentation.reset');

    const target = event.target;
    const slides = target.text.value;

    Meteor.call('presentation.insert', slides);

    target.text.value = '';
  },
});
