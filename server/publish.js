// import {  Meteor } from 'meteor/meteor'
// import {  Questions } from '/imports/questions.js';
// import {  Answers } from '/imports/answers.js';
//
// Meteor.publish('results', function () {
//   return [
//     Questions.find({}),
//     Answers.find({})
//   ];
// });
Meteor.publish('allUsers', function () {
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({});
    console.log(Meteor.users.find({}));
  }
});
