import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';

import { USER_TYPE } from '../constant';
import { checkNotEmpty, getPremadeUser, parseCsvSafely } from '../util/util';
import DepartmentCollection from './departments';

import PartnerCollection from './partners';
import StudentCollection from './students';
import SubjectCollection from './subjects';


// Kollekcio definialasa
const TopicCollection = new Mongo.Collection('topics');

// Sema definialasa
TopicCollection.attachSchema(new SimpleSchema({
  title: String,
  issuerId: String,
  subjectId: String,
  tutorId: { type: String, optional: true },
  consultantId: { type: String, optional: true },
  description: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
}));

if (Meteor.isServer) {
  // Egyediseg kenyszerek definialasa
  TopicCollection._ensureIndex('title', { unique: 1 });

  // Kollekcio publikalasa
  Meteor.publish('topics', function () {
    if (this.userId) {
      return TopicCollection.find();
    }
    return this.ready();
  });

  Meteor.publish('currentConsultantTopics', function () {
    if (this.userId && Meteor.user().type === USER_TYPE.consultant) {
      return TopicCollection.find({ consultantId: Meteor.user().premadeId });
    }
    return this.ready();
  });

  Meteor.publish('currentPartnerTopics', function () {
    if (this.userId && Meteor.user().type === USER_TYPE.partnerContact) {
      return TopicCollection.find({ partnerId: Meteor.user().profile.partnerId });
    }
    return this.ready();
  });

  Meteor.publish('currentStudentTopics', function () {
    if (this.userId && Meteor.user().type === USER_TYPE.student) {
      return TopicCollection.find({
        subjectId: {
          $in: getPremadeUser(StudentCollection).currentSubjects,
        },
      });
    }
    return this.ready();
  });
}

// Segedmetodusok
function transform(topic, singleInsert = true) {
  const subject = singleInsert
    ? SubjectCollection.findOne(topic.subjectId)
    : SubjectCollection.findOne({ code: topic.subjectCode });
  if (!subject || !subject.topic) {
    throw new Meteor.Error('invalid subject');
  }
  let issuer = singleInsert
    ? PartnerCollection.findOne(topic.issuerId)
    : PartnerCollection.findOne({ name: topic.issuerName });
  if (!issuer) {
    issuer = singleInsert
      ? DepartmentCollection.findOne(topic.issuerId)
      : DepartmentCollection.findOne({ name: topic.issuerName });
  }
  if (!issuer) {
    throw new Meteor.Error('invalid issuer');
  }
  topic.issuerId = issuer._id;
  if (!singleInsert) {
    topic.subjectId = subject._id;
    delete topic.subjectCode;
    delete topic.issuerName;
  }
}

function checkRequiredFields(topic) {
  if (!_.has(topic, 'title') || !_.has(topic, 'issuerName') || !_.has(topic, 'subjectCode')) {
    throw new Meteor.Error('malformed CSV. required fields: "title", "issuerName", "subjectCode"');
  }
}

// Manipulalo metodusok TODO: kulonbozo semak
Meteor.methods({
  'topics.insert'(topic) {
    transform(topic);
    TopicCollection.insert(topic);
  },
  'topics.insertFromCsv'(csvContent) {
    checkNotEmpty(csvContent, 'empty CSV');
    const failedInserts = [];
    parseCsvSafely(csvContent).forEach((topic) => {
      checkRequiredFields(topic);
      transform(topic, false);
      TopicCollection.insert(topic, (error) => {
        if (error) {
          failedInserts.push(error.message);
        }
      });
    });
    if (!_.isEmpty(failedInserts)) {
      throw new Meteor.Error(failedInserts);
    }
  },
  'topics.update'(_id, topic) {
    TopicCollection.update(_id, { $set: topic });
  },
  'topics.updateSupervisors'(_id, tutorId, consultantId) {
    const data = {};
    if (tutorId) {
      data.tutorId = tutorId;
    }
    if (consultantId) {
      data.consultantId = consultantId;
    }
    if (!_.isEmpty(data)) {
      TopicCollection.update(_id, { $set: data });
    }
  },
  'topics.updateConsultant'(_id, consultantId) {
    TopicCollection.update(_id, { $set: { consultantId } });
  },
  'topics.remove'(_id) {
    TopicCollection.remove(_id);
  },
  'topics.removeSupervisors'(_id) {
    TopicCollection.update(_id, { $unset: { tutorId: '', consultantId: '' } });
  },
  'topics.removeConsultant'(_id) {
    TopicCollection.update(_id, { $unset: { consultantId: '' } });
  },
});

export default TopicCollection;
