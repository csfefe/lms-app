import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';

import { USER_TYPE } from '../constant';
import { checkPartner } from '../util/util';


// Kollekcio definialasa
const ConsultantCollection = new Mongo.Collection('consultants');

// Sema definialasa
ConsultantCollection.attachSchema(new SimpleSchema({
  email: { type: String, regEx: SimpleSchema.RegEx.Email },
  partnerId: String,
  name: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
}));

if (Meteor.isServer) {
  // Egyediseg kenyszerek
  ConsultantCollection._ensureIndex('email', { unique: 1 });

  // Publikaciok
  Meteor.publish('consultants', function () {
    return ConsultantCollection.find();
  });

  Meteor.publish('currentPartnerConsultants', function () {
    if (this.userId && Meteor.user().type === USER_TYPE.partnerContact) {
      return ConsultantCollection.find({ partnerId: Meteor.user().profile.partnerId });
    }
    return this.ready();
  });
}

// Manipulalo metodusok
Meteor.methods({
  'consultants.insert'(consultant) {
    checkPartner(consultant.partnerId);
    ConsultantCollection.insert(consultant);
  },
  'consultants.update'(_id, consultant) {
    checkPartner(consultant.partnerId);
    ConsultantCollection.update(_id, { $set: consultant });
  },
  'consultants.remove'(_id) {
    ConsultantCollection.remove(_id);
  },
});

export default ConsultantCollection;
