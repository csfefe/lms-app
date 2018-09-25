import { Meteor } from 'meteor/meteor';

import SingleFileUpload from '../../../../components/SingleFileUpload';


export default class DocumentUpload extends SingleFileUpload {
  // noinspection JSUnusedGlobalSymbols
  uploadToServer = () => {
    const { subjectId, pos, dir } = this.props;
    Meteor.call(
      'upload.document',
      Meteor.user().premadeId,
      subjectId,
      pos,
      dir,
      this.file.name,
      this.fileReader.result,
      this.uploadCallback,
    );
  };
}
