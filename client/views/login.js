import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './login.html';


Template.login.events({
  'click .logout': ()=> {
    AccountsTemplates.logout();
  },
    'submit .loginModal' (event, template) {
        event.preventDefault();
        $('#loginModal').modal('show');

    }
});

  // Not working .onCreated

Template.login.onCreated(function(){
  this.autorun(() => {
    this.subscribe('allUsers');
  })
});
