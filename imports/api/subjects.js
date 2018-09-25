import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';

import { USER_TYPE } from '../constant';
import { getPremadeUser } from '../util/util';

import StudentCollection from './students';


// Kollekcio definialasa
const SubjectCollection = new Mongo.Collection('subjects');

// Dokumentum sema definialasa
const Document = new SimpleSchema({
  name: String,
  uploadStart: Date,
  uploadEnd: Date,
  extensions: { type: Array, defaultValue: [] },
  'extensions.$': String,
  dir: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
});

// Sema definialasa
SubjectCollection.attachSchema(new SimpleSchema({
  code: String,
  name: String,
  base: Boolean,
  topic: Boolean,
  documents: { type: Array, defaultValue: [] },
  'documents.$': { type: Document },
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
}));

if (Meteor.isServer) {
  // Egyediseg kenyszerek
  SubjectCollection._ensureIndex('name', { unique: 1 });
  SubjectCollection._ensureIndex('code', { unique: 1 });

  // Publikaciok
  Meteor.publish('subjects', function () {
    if (this.userId) {
      return SubjectCollection.find();
    }
    return this.ready();
  });

  Meteor.publish('topicSubjects', function () {
    if (this.userId) {
      return SubjectCollection.find({ topic: true });
    }
    return this.ready();
  });

  Meteor.publish('currentStudentSubjects', function () {
    if (this.userId && Meteor.user().type === USER_TYPE.student) {
      return SubjectCollection
        .find({ _id: { $in: getPremadeUser(StudentCollection).currentSubjects } });
    }
    return this.ready();
  });
}

// Manipulalo metodusok
Meteor.methods({
  'subjects.insert'(subject) {
    subject.code = subject.code.toUpperCase();
    SubjectCollection.insert(subject);
  },
  'subjects.updateCore'(_id, core) {
    core.code = core.code.toUpperCase();
    SubjectCollection.update(_id, { $set: core });
  },
  'subjects.updateDocuments'(_id, documents) {
    documents.forEach((document) => {
      if (document.uploadStart > document.uploadEnd) {
        throw new Meteor.Error('upload start has to be before upload end');
      }
    });
    SubjectCollection.update(_id, { $set: { documents } });
  },
  'subjects.remove'(_id) {
    SubjectCollection.remove(_id);
  },
});

export default SubjectCollection;
