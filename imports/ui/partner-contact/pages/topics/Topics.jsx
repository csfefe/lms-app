import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import ConsultantCollection from '../../../../api/consultants';
import SubjectCollection from '../../../../api/subjects';

import { ClientFormatter } from '../../../../util/Formatter';
import { lazyInit } from '../../../../util/util';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import InsertModal from './components/InsertModal';
import TopicsTable from './components/TopicsTable';


const header = [
  { name: 'title', text: 'Cím', width: 5, sortBy: 'title' },
  { name: 'subject', text: 'Tárgy', width: 3, sortBy: ['subject.name', 'title'] },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Topics = ({ loading, topics, subjects, consultants }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Témák</DividingHeader>
      <InsertModal formId="insertForm" entity="topic" subjects={subjects} />
      <TopicsTable header={header} data={topics} subjects={subjects} consultants={consultants} />
    </div>
);

Topics.propTypes = {
  loading: PropTypes.bool.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape).isRequired,
  consultants: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => {
  const loading = !Meteor.subscribe('currentPartnerTopics').ready()
    || !Meteor.subscribe('currentPartnerConsultants').ready()
    || !Meteor.subscribe('topicSubjects').ready();
  return {
    loading,
    topics: lazyInit(loading, ClientFormatter.formatTopics),
    consultants: ConsultantCollection.find().fetch(),
    subjects: SubjectCollection.find().fetch(),
  };
})(Topics);
