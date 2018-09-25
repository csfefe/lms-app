import fs from 'fs';
import { Meteor } from 'meteor/meteor';
import path from 'path';

import StudentCollection from '../imports/api/students';
import SubjectCollection from '../imports/api/subjects';


function getStudentNeptun(studentId) {
  const student = StudentCollection.findOne(studentId);
  if (!student) {
    throw new Meteor.Error('student not found');
  }
  return student.neptun;
}

function getSubject(subjectId) {
  const subject = SubjectCollection.findOne(subjectId);
  if (!subject) {
    throw new Meteor.Error('subject not found');
  }
  return subject;
}

function validateUpload(subject, pos, fileExtension) {
  const document = subject.documents[pos];
  if (!document) {
    throw new Meteor.Error('document not found');
  }
  const now = Date.now();
  if (document.uploadStart > now || document.uploadEnd < now) {
    throw new Meteor.Error('invalid upload. upload period is not active');
  }
  if (!document.extensions.includes(fileExtension)) {
    throw new Meteor.Error('invalid upload. bad file extension');
  }
}

function makeOutDir(root, pathParts) {
  if (!fs.existsSync(root)) {
    throw new Meteor.Error('save not possible. storage root not exists');
  }
  let res = root;
  pathParts.forEach((part) => {
    res = path.join(res, part.normalize('NFD'));
    if (!fs.existsSync(res)) {
      fs.mkdir(res, (error) => {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    }
  });
  return res;
}

Meteor.methods({
  'upload.document'(studentId, subjectId, pos, dir, filename, binaryContent) {
    const neptun = getStudentNeptun(studentId);
    const subject = getSubject(subjectId);
    const fileExtension = path.extname(filename);
    validateUpload(subject, pos, fileExtension);
    const outDir = makeOutDir(Meteor.settings.storageRootPath, [subject.name, dir]);
    fs.writeFile(path.join(outDir, neptun + fileExtension), binaryContent, 'binary', (error) => {
      if (error) {
        throw new Meteor.Error(error);
      }
    });
  },
});
