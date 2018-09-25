import { Meteor } from 'meteor/meteor';

import ConsultantCollection from '../api/consultants';
import DepartmentCollection from '../api/departments';
import PartnerContactCollection from '../api/partnerContacts';
import PartnerCollection from '../api/partners';
import StudentCollection from '../api/students';
import SubjectCollection from '../api/subjects';
import TopicCollection from '../api/topics';
import TutorCollection from '../api/tutors';

import { mergeCollections, parseDatetime } from './util';


export class ClientFormatter {
  static formatConsultants() {
    return ClientFormatter._formatPremadeUsers(ConsultantCollection.find().fetch());
  }

  static formatIssuers() {
    return mergeCollections(DepartmentCollection.find().fetch(), PartnerCollection.find().fetch());
  }

  static formatPartnerContacts() {
    return ClientFormatter._formatPremadeUsers(PartnerContactCollection.find().fetch());
  }

  static formatStudents() {
    return ClientFormatter._formatPremadeUsers(StudentCollection.find().fetch());
  }

  static formatSubjects() {
    return SubjectCollection.find().fetch().map((subject) => {
      const res = { documents: subject.documents };
      delete subject.documents;
      res.core = subject;
      return res;
    });
  }

  static formatConsultantReviews() {
    return TopicCollection.find().fetch().map((topic) => {
      const res = { topic };
      res.student = StudentCollection.findOne({ topicId: topic._id });
      return res;
    });
  }

  static formatTopics() {
    return TopicCollection.find().fetch().map((topic) => {
      topic.issuer = DepartmentCollection.findOne(topic.issuerId);
      if (!topic.issuer) {
        topic.issuer = PartnerCollection.findOne(topic.issuerId);
      }
      topic.subject = SubjectCollection.findOne(topic.subjectId);
      return topic;
    });
  }

  static formatTopicApplies() {
    return StudentCollection.findOne().topicApplies
      .map(topicApply => TopicCollection.findOne(topicApply));
  }

  static formatTopicClassification() {
    return ClientFormatter.formatStudents().map((student) => {
      const res = {
        email: student.email,
        name: student.name,
        neptun: student.neptun,
        registered: student.registered,
      };
      if (student.topicId) {
        res.title = TopicCollection.findOne(student.topicId).title;
      }
      return res;
    });
  }

  static formatTutors() {
    return ClientFormatter._formatPremadeUsers(TutorCollection.find().fetch());
  }

  static _formatPremadeUsers(premadeUsers) {
    return premadeUsers.map((premadeUser) => {
      premadeUser.registered = Meteor.users.findOne({ premadeId: premadeUser._id }) !== undefined;
      return premadeUser;
    });
  }
}

export class ServerFormatter {
  static formatDocuments(documents) {
    const res = [];
    documents.forEach((document) => {
      if (document) {
        const formatted = {
          name: document.name,
          dir: document.dir,
          extensions: document.extensions,
        };
        formatted.uploadStart = parseDatetime(document.uploadStartDate, document.uploadStartTime);
        formatted.uploadEnd = parseDatetime(document.uploadEndDate, document.uploadEndTime);
        res.push(formatted);
      }
    });
    return res;
  }
}
