import {  Meteor      } from 'meteor/meteor';
import {  Template    } from 'meteor/templating';
import {  ReactiveVar } from 'meteor/reactive-var';

import '../main.html';

Meteor.startup(function() {
  // $(document).on('touchmove', function(e) {
  //   e.preventDefault();
  // });
  //
  // $(document).on('touchstart', function(e) {
  //   if (e.target.nodeName !== 'INPUT') {
  //       e.preventDefault();
  //   }
  // });
  $(function() {
    document.addEventListener("touchmove", function(e){ e.preventDefault(); }, false);
  });

    openNav = function() {
        document.getElementById("sideNav").style.width = "175px";
        document.getElementById("main").style.marginLeft = "175px";
        document.getElementById("container").style.marginLeft = "175px";
    }
    closeNav = function() {
        document.getElementById("sideNav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("container").style.marginLeft = "0";
    }
    toggleNav = function() {
        navSize = document.getElementById("sideNav").style.width;
        if (navSize == "175px") {
            return closeNav();
        } else {
            return openNav();
        }
    }

    submitSurvey = function() {
        document.getElementById("survey-form").submit();
    }
});

Template.layout.events({
  'click .links' (event) {
    var links = document.getElementsByClassName('links').length;
    for(var i = 0; i < links; i++)
    {
      document.getElementsByClassName('links')[i].classList.remove("active-link");
    }
    event.target.classList.add("active-link");
    closeNav();
  },
  'click #container' () {
    if(document.getElementById("sideNav").style.width == "175px") {
      closeNav();
    }
  },
  'click #logout': ()=> {
    AccountsTemplates.logout();
    $('#loginModal').modal('hide');
  },

  'click .at-btn.submit' () {
    $('#loginModal').modal('hide');
  },

  'click #login' (event, template) {
        event.preventDefault();
        $('#loginModal').modal('show');

    },
});

Template.index.events({
  'click .btn-lg' () {
    $('#confirmationModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
});


// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });
//
// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });
//
// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
