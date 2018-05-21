import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Surveys } from '/imports/surveys.js';
import { Questions } from '/imports/questions.js';

import './question.js';
import './editor.html';

Template.editor.onCreated(function editorOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('questions');
    Meteor.subscribe('surveys', function() {
      var sID = SessionStore.get('selectedID');
      document.getElementById(sID).classList.add('active');
    });
});

Template.editor.helpers({
    questions() {
        return Questions.find({}, {sort: {count: 1}});
    },
    surveys() {
      return Surveys.find({}, {sort: {createdAt: 1}});
    },
    selectedSurvey() {
      return Questions.find({'surveyID': SessionStore.get('selectedID')}, {sort: {count: 1}});
    },
    isMC(option) {
      if(option == "MC")
        return true;
    },
    admin: function(){
      return Roles.userIsInRole(Meteor.userId(), 'admin');
    },
});

Template.editor.events({
    'submit .new-survey' (event) {
      event.preventDefault();
      const target = event.target;
      const text = target.text.value;
      var count = 0;

      Meteor.call('surveys.insert', text, count, new Date());

      // Clear form
      target.text.value = '';
    },
    'click #delete-survey'() {
      Meteor.call('surveys.remove', this._id);
    },

    'submit .new-question' (event, template) {
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;
        var length = text.length;
        var option = template.find('input:radio[name=options]:checked').value;
        var optName = template.find('input:radio[name=options]:checked').id;
        var count = Questions.find({}).count();
        var surveyID = SessionStore.get('selectedID');

        // Field now set to required, alert not needed
        if(length > 0) {
          if(option == 'optMulti')
          {
            // Grab current question text
            document.getElementById("multiQ").value = text;

            // Display multiple choice modal
            $('#multiModal').modal('show');
          } else {
            // Insert question into collection
            Meteor.call('questions.insert', text, optName, count, surveyID);
          }
          // Increment count
          Surveys.update({_id: surveyID},
            { $inc: { count: 1 }
          });

          // Clear form
          target.text.value = '';
        } else {  alert("Question does not contain enough characters.");  }
    },
    'click #add-multi-btn' (event) {
      event.preventDefault();
      var question = document.getElementById("multiQ").value;
      var choiceA = document.getElementsByName("choices")[0].value;
      var choiceB = document.getElementsByName("choices")[1].value;
      var choiceC = document.getElementsByName("choices")[2].value;
      
      var count = Questions.find({}).count();
      var surveyID = SessionStore.get('selectedID');

      // Insert, clear form, close modal
      Meteor.call('mcquestions.insert', question, "MC", count, choiceA, choiceB, choiceC, surveyID);
      $('#multiModal').modal('hide');

      document.getElementsByName("choices")[0].value = '';
      document.getElementsByName("choices")[1].value = '';
      document.getElementsByName("choices")[2].value = '';
    },

    // Remove Question
    'click #delete-btn'() {
      Meteor.call('questions.remove', this._id);
      // Decrement count
      Surveys.update({_id: SessionStore.get('selectedID')},
        { $inc: { count: -1 }
      });
    },

    // Change active Survey
    'click .list-surveys' (event) {
      $(event.target).addClass('active').siblings().removeClass('active');
      SessionStore.set('selectedID', this._id);
    },
});
