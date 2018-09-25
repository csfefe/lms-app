import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';


// Kollekcio definialasa
const ReviewCollection = new Mongo.Collection('reviews');

const schemas = {};

// Konzulens sema
schemas.ConsultantReview = new SimpleSchema({
  studentId: String,
  consultantId: String,
  subjectId: String,
  text: String,
  grade: { type: SimpleSchema.Integer, min: 1, max: 5 },
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
});

// Oktato sema
schemas.TutorReview = new SimpleSchema({
  studentId: String,
  tutorId: String,
  subjectId: String,
  grade: { type: SimpleSchema.Integer, min: 1, max: 5 },
  name: { type: String, optional: true },
  text: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: true,
    trimStrings: true,
  },
});

// Semak kollekciohoz csatolasa
ReviewCollection.attachSchema(schemas.ConsultantReview, { selector: { type: 'consultant' } });
ReviewCollection.attachSchema(schemas.TutorReview, { selector: { type: 'tutor' } });
