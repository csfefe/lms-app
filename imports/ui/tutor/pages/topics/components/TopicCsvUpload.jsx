import { Meteor } from 'meteor/meteor';

import SingleFileUpload from '../../../../components/SingleFileUpload';


export default class TopicCsvUpload extends SingleFileUpload {
  // noinspection JSUnusedGlobalSymbols
  uploadToServer = () => {
    Meteor.call('topics.insertFromCsv', this.fileReader.result, this.uploadCallback);
  };
}
