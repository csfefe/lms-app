import PropTypes from 'prop-types';
import React from 'react';
import { Header, Icon, Message, Segment } from 'semantic-ui-react';

import DocumentUpload from './DocumentUpload';


const Subject = ({ subject }) => {
  const now = new Date();
  const uploads = subject.documents
    .filter(document => now >= document.uploadStart && now <= document.uploadEnd)
    .map((document, pos) => (
      <div key={pos}>
        {document.name}
        <DocumentUpload
          placeholder="Tallózás..."
          accept={document.extensions.join()}
          subjectId={subject._id}
          pos={pos}
          dir={document.dir}
        />
      </div>
    ));
  const content = uploads.length < 1 ?
    <NoUploadWarning /> :
    <Uploads attach="bottom" uploads={uploads} />;
  return (
    <div style={{ paddingBottom: '1em' }}>
      <Header as="h5" attached="top" content={subject.name} subheader={subject.code} />
      <Segment attached="bottom">
        <Message info>
          <Icon name="info" />
          Nem található értékelés.
        </Message>
        <Message warning>
          <Icon name="warning" />
          Nincs feltöltési időszak!
        </Message>
      </Segment>
    </div>

  );
};

Subject.propTypes = { subject: PropTypes.shape().isRequired };

/*
 <div style={{paddingBottom: '1em'}}>
 <Header as='h5' attached='top' content={props.subject.name} subheader={props.subject.code}/>
 {content}
 </div>
 */

const Uploads = ({ attach, uploads }) => <Message attached={attach}>{uploads}</Message>;

Uploads.propTypes = {
  attach: PropTypes.bool.isRequired,
  uploads: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const NoUploadWarning = () => (
  <Message attached="bottom" warning>
    <Icon name="warning" />
    Nincs feltöltési időszak!
  </Message>
);

const CurrentResult = () => (
  <Message attached="bottom" info>
    <Icon name="percent" />
    Laborátlag: <b>3.01</b>
  </Message>
);

export default Subject;
