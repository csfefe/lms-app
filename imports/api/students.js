import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';

import { USER_TYPE } from '../constant';
import { checkNotEmpty, parseCsvSafely, swap } from '../util/util';

import SubjectCollection from './subjects';
import TopicCollection from './topics';


// Kollekcio definialasa
const StudentCollection = new Mongo.Collection('students');

// Sema definialasa
StudentCollection.attachSchema(new SimpleSchema({
  email: { type: String, regEx: SimpleSchema.RegEx.Email },
  neptun: { type: String, min: 6, max: 6 },
  currentSubjects: { type: Array, defaultValue: [] },
  'currentSubjects.$': String,
  completedSubjects: { type: Array, defaultValue: [] },
  'completedSubjects.$': String,
  topicApplies: { type: Array, minCount: 0, maxCount: 3, defaultValue: [] },
  'topicApplies.$': String,
  topicId: { type: String, optional: true },
  name: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
}));

if (Meteor.isServer) {
  // Egyediseg kenyszerek
  StudentCollection._ensureIndex('email', { unique: 1 });
  StudentCollection._ensureIndex('neptun', { unique: 1 });

  // Publikaciok
  Meteor.publish('students', function () {
    if (this.userId) {
      return StudentCollection.find();
    }
    return this.ready();
  });

  Meteor.publish('currentStudent', function () {
    if (this.userId && Meteor.user().type === USER_TYPE.student) {
      return StudentCollection.find(Meteor.user().premadeId);
    }
    return this.ready();
  });
}

// Segedmetodusok
function transform(student) {
  student.neptun = student.neptun.toUpperCase();
  student.currentSubjects = SubjectCollection
    .find({ base: true }, { fields: { _id: 1 } })
    .map(subject => subject._id);
}

function checkRequiredFields(student) {
  if (!_.has(student, 'email') || !_.has(student, 'neptun')) {
    throw new Meteor.Error('malformed CSV. required fields: "email", "neptun"');
  }
}

function checkStudent(student) {
  if (!student) {
    throw new Meteor.Error('invalid student');
  }
}

// Manipulalo metodusok
Meteor.methods({
  'students.insert'(student) {
    transform(student);
    StudentCollection.insert(student);
  },
  'students.insertFromCsv'(csvContent) {
    checkNotEmpty(csvContent, 'empty CSV');
    const failedInserts = [];
    parseCsvSafely(csvContent).forEach((student) => {
      checkRequiredFields(student);
      transform(student);
      StudentCollection.insert(student, (error) => {
        if (error) {
          failedInserts.push(error.message);
        }
      });
    });
    if (!_.isEmpty(failedInserts)) {
      throw new Meteor.Error(failedInserts);
    }
  },
  'students.update'(_id, student) {
    student.neptun = student.neptun.toUpperCase();
    StudentCollection.update(_id, { $set: student });
  },
  'students.remove'(_id) {
    StudentCollection.remove(_id);
  },
  'students.insertTopicApply'(topicId) {
    const student = StudentCollection.findOne(Meteor.user().premadeId);
    checkStudent(student);
    const topic = TopicCollection.findOne(topicId);
    if (!student.currentSubjects.includes(topic.subjectId)) {
      throw new Meteor.Error('invalid subject');
    }
    const { topicApplies } = student;
    if (topicApplies.length < Meteor.settings.public.applyCount
      && !topicApplies.includes(topicId)) {
      StudentCollection.update(student._id, { $push: { topicApplies: topicId } });
    }
  },
  'students.moveUpTopicApply'(topicId) {
    const student = StudentCollection.findOne(Meteor.user().premadeId);
    checkStudent(student);
    const { topicApplies } = student;
    if (!topicApplies.includes(topicId)) {
      throw new Meteor.Error('invalid topic');
    }
    const index = topicApplies.indexOf(topicId);
    if (index === 0) {
      return;
    }
    swap(topicApplies, index, index - 1);
    StudentCollection.update(student._id, { $set: { topicApplies } });
  },
  'students.moveDownTopicApply'(topicId) {
    const student = StudentCollection.findOne(Meteor.user().premadeId);
    checkStudent(student);
    const { topicApplies } = student;
    if (!_.includes(topicApplies, topicId)) {
      throw new Meteor.Error('invalid topic');
    }
    const index = topicApplies.indexOf(topicId);
    if (index === topicApplies.length - 1) {
      return;
    }
    swap(topicApplies, index, index + 1);
    StudentCollection.update(student._id, { $set: { topicApplies } });
  },
  'students.removeTopicApply'(topicId) {
    StudentCollection.update(Meteor.user().premadeId, { $pull: { topicApplies: topicId } });
  },
  'students.setTopics'(classification) {
    classification.forEach(({ studentId, topicId }) => {
      StudentCollection.update(studentId, { topicId });
    });
  },
  'students.unsetTopics'() {
    StudentCollection.update({}, { $unset: { topicId: '' } }, { multi: true });
  },
  // 'students.setTopicReview'(_id, review) {
  //     StudentCollection.update(_id, {$set: {review: review}});
  // },
  // 'students.unsetTopicReview'(_id) {
  //     StudentCollection.update(_id, {$unset: {review: ''}});
  // }
});

export default StudentCollection;
