import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './question.html';

Template.question.events({
    'click .delete'() {
      Meteor.call('questions.remove', this._id);
    },
});
