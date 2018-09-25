import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';


// Kollekcio definialasa
const TutorCollection = new Mongo.Collection('tutors');

// Sema definialasa
TutorCollection.attachSchema(new SimpleSchema({
  email: { type: String, regEx: SimpleSchema.RegEx.Email },
  name: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
}));

if (Meteor.isServer) {
  // Egyediseg kenyszerek
  TutorCollection._ensureIndex('email', { unique: 1 });

  // Publikaciok
  Meteor.publish('tutors', function () {
    return TutorCollection.find();
  });
}

// Manipulalo metodusok
Meteor.methods({
  'tutors.insert'(tutor) {
    TutorCollection.insert(tutor);
  },
  'tutors.update'(_id, tutor) {
    TutorCollection.update(_id, { $set: tutor });
  },
  'tutors.remove'(_id) {
    TutorCollection.remove(_id);
  },
});

export default TutorCollection;
