import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';

import { checkPartner } from '../util/util';


// Kollekcio definialasa
const PartnerContactCollection = new Mongo.Collection('partnerContacts');

// Sema definialasa
PartnerContactCollection.attachSchema(new SimpleSchema({
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
  PartnerContactCollection._ensureIndex('email', { unique: 1 });

  // Publikaciok
  Meteor.publish('partnerContacts', function () {
    return PartnerContactCollection.find();
  });
}

// Manipulalo metodusok
Meteor.methods({
  'partnerContacts.insert'(partnerContact) {
    checkPartner(partnerContact.partnerId);
    PartnerContactCollection.insert(partnerContact);
  },
  'partnerContacts.update'(_id, partnerContact) {
    checkPartner(partnerContact.partnerId);
    PartnerContactCollection.update(_id, { $set: partnerContact });
  },
  'partnerContacts.remove'(_id) {
    PartnerContactCollection.remove(_id);
  },
});

export default PartnerContactCollection;
