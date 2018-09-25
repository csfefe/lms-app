import { Meteor } from 'meteor/meteor';

import '../imports/api/consultants';
import '../imports/api/departments';
import '../imports/api/partnerContacts';
import '../imports/api/partners';
import '../imports/api/reviews';
import '../imports/api/students';
import '../imports/api/subjects';
import '../imports/api/topics';
import '../imports/api/tutors';
import '../imports/api/users';

import '../imports/startup/server/init';

import initDb from './initDb';


if (Meteor.isServer) {
  if (Meteor.settings.initDb) {
    initDb();
  }
}
