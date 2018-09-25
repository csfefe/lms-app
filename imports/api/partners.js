import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';


// Kollekcio definialasa
const PartnerCollection = new Mongo.Collection('partners');

// Sema definialasa
PartnerCollection.attachSchema(new SimpleSchema({
  name: String,
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
}));

if (Meteor.isServer) {
  PartnerCollection._ensureIndex('name', { unique: 1 });

  // Kollekcio publikalasa
  Meteor.publish('partners', function () {
    return PartnerCollection.find();
  });
}

// Manipulalo metodusok
Meteor.methods({
  'partners.insert'(partner) {
    PartnerCollection.insert(partner);
  },
  'partners.update'(_id, partner) {
    PartnerCollection.update(_id, { $set: partner });
  },
  'partners.remove'(_id) {
    PartnerCollection.remove(_id);
  },
});

export default PartnerCollection;
