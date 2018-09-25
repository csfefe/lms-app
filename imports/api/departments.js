import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';


// Kollekcio definialasa
const DepartmentCollection = new Mongo.Collection('departments');

// Sema definialasa
DepartmentCollection.attachSchema(new SimpleSchema({
  name: String,
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
}));

if (Meteor.isServer) {
  // Egyediseg kenyszerek
  DepartmentCollection._ensureIndex('name', { unique: 1 });

  // Publikaciok
  Meteor.publish('departments', function () {
    return DepartmentCollection.find();
  });
}

// Manipulalo metodusok
Meteor.methods({
  'departments.insert'(department) {
    DepartmentCollection.insert(department);
  },
  'departments.update'(_id, department) {
    DepartmentCollection.update(_id, { $set: department });
  },
  'departments.remove'(_id) {
    DepartmentCollection.remove(_id);
  },
});

export default DepartmentCollection;
