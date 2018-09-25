import { Meteor } from 'meteor/meteor';

import ConsultantCollection from '../imports/api/consultants';
import DepartmentCollection from '../imports/api/departments';
import PartnerContactCollection from '../imports/api/partnerContacts';
import PartnerCollection from '../imports/api/partners';
import StudentCollection from '../imports/api/students';
import SubjectCollection from '../imports/api/subjects';
import TopicCollection from '../imports/api/topics';
import TutorCollection from '../imports/api/tutors';


function insertTutors() {
  [
    { email: 'o1@mail.com' },
  ].forEach((tutor) => {
    TutorCollection.insert(tutor);
  });
}

function insertSubjects() {
  [
    { code: 'TERMINFO', name: 'Termelésinformatika', base: true, topic: false },
    { code: 'VIR', name: 'Vállalatirányítási rendszerek', base: true, topic: false },
    { code: 'ADATLAB', name: 'Adatbányászat laboratórium', base: true, topic: false },
    { code: 'TEMALAB', name: 'Témalaboratórium', base: true, topic: true },
    { code: 'SAPLAB', name: 'SAP laboratórium', base: true, topic: false },
  ].forEach((subject) => {
    SubjectCollection.insert(subject);
  });
}

function insertStudents() {
  [
    { email: 'h1@mail.com', neptun: 'ABCDEF' },
    { email: 'h2@mail.com', neptun: 'BCDEFG' },
    { email: 'h3@mail.com', neptun: 'CDEFGH' },
    { email: 'h4@mail.com', neptun: 'DEFGHI' },
    { email: 'h5@mail.com', neptun: 'EFGHIJ' },
  ].forEach((student) => {
    student.currentSubjects = SubjectCollection
      .find({ base: true }, { fields: { _id: 1 } })
      .map(subject => subject._id);
    StudentCollection.insert(student);
  });
}

function insertDepartments() {
  [
    { name: 'ETT' },
    { name: 'TMIT' },
  ].forEach(department => DepartmentCollection.insert(department));
}

function insertPartners() {
  [
    { name: 'SAP' },
    { name: 'Danubius Informatika' },
    { name: 'Siemens' },
    { name: 'IBM' },
  ].forEach(partner => PartnerCollection.insert(partner));
}

function insertConsultants() {
  [
    { email: 'ko1@mail.com' },
  ].forEach((consultant) => {
    consultant.partnerId = PartnerCollection.findOne({ name: 'SAP' }, { fields: { _id: 1 } })._id;
    ConsultantCollection.insert(consultant);
  });
}

function insertTopics() {
  [
    {
      title: 'Elso tema',
      issuerId: PartnerCollection.findOne({ name: 'SAP' }, { fields: { _id: 1 } })._id,
      subjectId: SubjectCollection.findOne({ code: 'TEMALAB' }, { fields: { _id: 1 } })._id,
    },
  ].forEach((topic) => {
    TopicCollection.insert(topic);
  });
}

function insert() {
  console.log('inserting data to collections...');
  insertTutors();
  insertSubjects();
  insertStudents();
  insertDepartments();
  insertPartners();
  insertConsultants();
  insertTopics();
}

function drop() {
  console.log('dropping collections...');
  Meteor.users.rawCollection().drop();
  StudentCollection.rawCollection().drop();
  TopicCollection.rawCollection().drop();
  ConsultantCollection.rawCollection().drop();
  PartnerContactCollection.rawCollection().drop();
  DepartmentCollection.rawCollection().drop();
  PartnerCollection.rawCollection().drop();
  SubjectCollection.rawCollection().drop();
  TutorCollection.rawCollection().drop();
}

export default function initDb() {
  drop();
  insert();
}
