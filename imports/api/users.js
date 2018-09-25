import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { USER_TYPE } from '../constant';

import ConsultantCollection from './consultants';
import PartnerContactCollection from './partnerContacts';
import StudentCollection from './students';
import TutorCollection from './tutors';


const services = Object.freeze({ password: 'password', google: 'google' });

if (Meteor.isServer) {
  // Kliens oldali modositas tiltasa
  Meteor.users.deny({ update: () => true });

  // Publikaciok
  Meteor.publish(null, function () {
    if (this.userId) {
      return Meteor.users.find(this.userId, { fields: { premadeId: 1, type: 1 } });
    }
    return this.ready();
  });

  Meteor.publish('allUser', function () {
    if (this.userId && Meteor.user().type === USER_TYPE.tutor) {
      return Meteor.users.find();
    }
    return this.ready();
  });

  Meteor.publish('registeredUsers', function (userType) {
    if (this.userId) {
      return Meteor.users.find({ type: userType }, { fields: { premadeId: 1 } });
    }
    return this.ready();
  });
}

// Segedmetodusok
function getPremadeData(email) {
  const idField = { _id: 1 };
  const idAndPartnerIdFields = { _id: 1, partnerId: 1 };
  let premadeData = StudentCollection.findOne({ email }, { fields: idField });
  if (premadeData) {
    premadeData.type = USER_TYPE.student;
    return premadeData;
  }
  premadeData = ConsultantCollection.findOne({ email }, { fields: idAndPartnerIdFields });
  if (premadeData) {
    premadeData.type = USER_TYPE.consultant;
    return premadeData;
  }
  premadeData = PartnerContactCollection.findOne({ email }, { fields: idAndPartnerIdFields });
  if (premadeData) {
    premadeData.type = USER_TYPE.partnerContact;
    return premadeData;
  }
  premadeData = TutorCollection.findOne({ email }, { fields: idField });
  if (premadeData) {
    premadeData.type = USER_TYPE.tutor;
    return premadeData;
  }
  throw new Meteor.Error('invalid email');
}

function getUserByEmailAndService(email, service) {
  switch (service) {
    case services.password:
      return Meteor.users.findOne({ 'emails.address': email });
    case services.google:
      return Meteor.users.findOne({ 'services.google.email': email });
    default:
      throw new Meteor.Error(`invalid service: ${service}. supported services: "password", "google"`);
  }
}

function addUserDataToPasswordUser(options, user) {
  const premadeData = getPremadeData(options.email);
  user.premadeId = premadeData._id;
  user.type = premadeData.type;
  user.profile = { name: options.name };
  if (options.partnerId) {
    user.partnerId = options.partnerId;
  }
}

function addUserDataToGoogleUser(options, user) {
  const premadeData = getPremadeData(user.services.google.email);
  user.premadeId = premadeData._id;
  user.type = premadeData.type;
  if (options.profile) {
    user.profile = options.profile;
  } else {
    user.profile = { name: user.services.google.name };
  }
}

function mergeWithExistingUser(user, existingUser, service) {
  user.services[service] = existingUser.services[service];
  user.premadeId = existingUser.premadeId;
  user.profile = existingUser.profile;
  user.type = existingUser.type;
  if (existingUser.partnerId) {
    user.partnerId = existingUser.partnerId;
  }
}

// Extra tulajdonsagok hozzaadasa felhasznalo letrehozasakor
Accounts.onCreateUser((options, user) => {
  if (user.services.password) {
    const existingUser = getUserByEmailAndService(options.email, services.google);
    if (existingUser) {
      mergeWithExistingUser(user, existingUser, services.google);
      Meteor.users.remove(existingUser._id);
    } else {
      addUserDataToPasswordUser(options, user);
    }
  } else if (user.services.google) {
    const existingUser = getUserByEmailAndService(user.services.google.email, services.password);
    if (existingUser) {
      mergeWithExistingUser(user, existingUser, services.password);
      Meteor.users.remove(existingUser._id);
    } else {
      addUserDataToGoogleUser(options, user);
    }
  } else {
    throw new Meteor.Error('invalid service. supported services: "password", "google"');
  }
  return user;
});

// Manipulalo metodusok
Meteor.methods({
  'users.insert'(user) {
    Accounts.createUser(user);
  },
  'users.remove'(_id) {
    Meteor.users.remove(_id);
  },
});
