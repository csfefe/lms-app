import { Meteor } from 'meteor/meteor';

import SingleFileUpload from '../../../../components/SingleFileUpload';


export default class StudentCsvUpload extends SingleFileUpload {
  // noinspection JSUnusedGlobalSymbols
  uploadToServer = () => {
    Meteor.call('students.insertFromCsv', this.fileReader.result, this.uploadCallback);
  };
}
