import { Meteor } from 'meteor/meteor';
import {  check   } from 'meteor/check';

import '/imports/answers.js';
import '/imports/questions.js';
import '/imports/surveys.js';

Meteor.startup(() => {
  // code to run on server at startup
  // if(Presentation.find().count() === 0) {
  //   var temp = '<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRGRvoCKYrKYe0fpWQIudeZaE234q09no8p1mtvh-Cecvp-mnGMXI7_H5s0z2MNW1JGiYfYOEyzZP7v/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
  //   Meteor.call('presentation.insert', temp);
  // }
});
