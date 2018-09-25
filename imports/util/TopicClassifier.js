import _ from 'lodash';
import { Meteor } from 'meteor/meteor';


export default class TopicClassifier {
  matchType = Object.freeze({ available: 0, match: 1, conflict: 2 });

  constructor(topics, students) {
    this.topics = topics;
    this.students = students;
    this.applyCount = Meteor.settings.public.applyCount;
  }

  classify() {
    const classification = [];
    this.topics.forEach((topic) => {
      const studentsByPriority = this._findStudentsByPriority(topic._id);
      const { available, match, conflict } = this.matchType;
      switch (this._getMatchType(studentsByPriority)) {
        case available:
        case conflict:
          classification.push({ topic });
          break;
        case match:
          classification.push({ topic, student: studentsByPriority[0][0] });
          break;
        default:
        // Nem lehetseges
      }
    });
    return classification;
  }

  findUnclassifiedStudents(classification) {
    const unclassifiedStudents = [];
    this.students.forEach((student) => {
      const res = _.filter(classification, { student });
      if (_.isEmpty(res)) {
        unclassifiedStudents.push(student);
      }
    });
    return unclassifiedStudents;
  }

  _findStudentsByPriority(topicId) {
    const studentsByPriority = [];
    for (let i = 0; i < this.applyCount; ++i) {
      const studentsForPriority = this.students.filter(student =>
        !_.isEmpty(student.topicApplies) && student.topicApplies[i] === topicId);
      studentsByPriority.push(studentsForPriority);
    }
    return studentsByPriority;
  }

  _getMatchType(studentsByPriority) {
    const { available, match, conflict } = this.matchType;
    if (studentsByPriority[0].length === 1) {
      return match;
    }
    let noStudents = true;
    studentsByPriority.forEach((studentsForPriority) => {
      if (studentsForPriority.length > 0) {
        noStudents = false;
      }
    });
    return noStudents ? available : conflict;
  }
}
