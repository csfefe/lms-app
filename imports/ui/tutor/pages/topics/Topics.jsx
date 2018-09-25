import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'semantic-ui-react';

import ConsultantCollection from '../../../../api/consultants';
import SubjectCollection from '../../../../api/subjects';
import TutorCollection from '../../../../api/tutors';

import { ClientFormatter } from '../../../../util/Formatter';
import { lazyInit } from '../../../../util/util';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import InsertModal from './components/InsertModal';
import TopicCsvUpload from './components/TopicCsvUpload';
import TopicsTable from './components/TopicsTable';


const header = [
  { name: 'title', text: 'Cím', width: 4, sortBy: 'title' },
  { name: 'issuer', text: 'Kibocsátó', width: 2, sortBy: ['issuer.name', 'title'] },
  { name: 'subject', text: 'Tárgy', width: 2, sortBy: ['subject.name', 'title'] },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Topics = ({ loading, topics, issuers, subjects, tutors, consultants }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Témák</DividingHeader>
      <TopicCsvUpload placeholder="CSV fájlból..." accept=".csv" />
      <Divider horizontal>Vagy</Divider>
      <InsertModal formId="insertForm" entity="topic" issuers={issuers} subjects={subjects} />
      <TopicsTable
        header={header}
        data={topics}
        issuers={issuers}
        subjects={subjects}
        tutors={tutors}
        consultants={consultants}
      />
    </div>
);

Topics.propTypes = {
  loading: PropTypes.bool.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape).isRequired,
  issuers: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape).isRequired,
  tutors: PropTypes.arrayOf(PropTypes.shape).isRequired,
  consultants: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => {
  const loading = !Meteor.subscribe('topics').ready()
    || !Meteor.subscribe('departments').ready()
    || !Meteor.subscribe('partners').ready()
    || !Meteor.subscribe('topicSubjects').ready()
    || !Meteor.subscribe('tutors').ready()
    || !Meteor.subscribe('consultants').ready();
  return {
    loading,
    topics: lazyInit(loading, ClientFormatter.formatTopics),
    issuers: lazyInit(loading, ClientFormatter.formatIssuers),
    subjects: SubjectCollection.find().fetch(),
    tutors: TutorCollection.find().fetch(),
    consultants: ConsultantCollection.find().fetch(),
  };
})(Topics);
