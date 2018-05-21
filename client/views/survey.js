import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Questions } from '/imports/questions.js';
// import { Results   } from '/imports/results.js';
import './question.js';
import './survey.html';
// import '../scripts/results.js';

Template.survey.onCreated(function editorOnCreated() {
    this.res = new ReactiveVar();
    Meteor.subscribe('questions');
});

Template.survey.helpers({
  questions() {
    return Questions.find({'surveyID': SessionStore.get('selectedID')}, {sort: {count: 1}});
  },
  isTF(option) {
    if(option == "True/False")
      return true;
  },
  isSlider(option) {
    if(option == "Slider")
      return true;
  },
  isShort(option) {
    if(option == "Short")
      return true;
  },
  isMC(option) {
    if(option == "MC")
      return true;
  },
  offset: function(index){
      return ++index;
  },
});

Template.survey.events({
    'click #confirm-submit' (event, template){
        //-- Array to store Questions and Answers
        var queArr = [];
        var optArr = [];
        var ansArr = [];
        var tfArr = [];
        var sliderArr = [];
        var shortArr = [];
        var mcArr = [];
        var totArr = [];

        var qCount = Questions.find({'surveyID': SessionStore.get('selectedID')}).count();
        for(var i=0; i < qCount; i++) {
          queArr[i] = document.getElementsByClassName("qText")[i].innerHTML;
          optArr[i] = document.getElementsByClassName("qText")[i].id;
        }

        //-- Loop through True/False Results
        $('.btn-group > .btn.active > .truefalse').each(function(idx, item) {
          tfArr[idx] = $(item).val();
        });

        //-- Loop through Slider Results
        $('.ansSlider > .slider').each(function(idx, item) {
          sliderArr[idx] = $(item).val();
        });

        //-- Loop through Short Results
        $('.shortAns').each(function(idx, item) {
          if($(item).val().length > 0)
            shortArr[idx] = $(item).val();
          else {
            shortArr[idx] = "N/A";
          }
        });

        //-- Loop through Multiple Choice Results
        $('.selection:checked').each(function(idx, item) {
            mcArr[idx] = $(item).val();
        });

        //-- Get patient info from confirmation modal
        var patient = document.getElementsByClassName("survey-name")[0].value;
        var physician = document.getElementsByClassName("survey-physician")[0].value;

        Meteor.call('patients.insert', patient, physician, function(error, result){
          var patientID = result;
          var temp;
          //-- Insert into results collection
          for(var i = 0; i < optArr.length; i++) {
            switch(optArr[i]) {
              case "True/False":
                temp = tfArr.shift();
                Meteor.call('results.insert', queArr[i], temp, patientID);
                console.log("Q"+i+": "+queArr[i] + " -- A: " + temp);
                break;
              case "Slider":
                temp = sliderArr.shift();
                Meteor.call('results.insert', queArr[i], temp, patientID);
                console.log("Q"+i+": "+queArr[i] + " -- A: " + temp);
                break;
              case "Short":
                temp = shortArr.shift();
                Meteor.call('results.insert', queArr[i], temp, patientID);
                console.log("Q"+i+": "+queArr[i] + " -- A: " + temp);
                break;
              case "MC":
                temp = mcArr.shift();
                Meteor.call('results.insert', queArr[i], temp, patientID);
                console.log("Q"+i+": "+queArr[i] + " -- A: " + temp);
                break;
              default:
                console.log("Default");
            }
          }
        });
        $('#confirmationModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        //-- Go to homepage and remove active link from survey, set active link to home
        Router.go('/');
        $(document.getElementsByClassName('links')[0]).addClass('active-link').siblings().removeClass('active-link');
    },
});
