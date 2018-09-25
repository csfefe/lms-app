import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import { ClientFormatter } from '../../../../util/Formatter';
import { lazyInit } from '../../../../util/util';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import AppliesTable from './components/AppliesTable';
import TopicsTable from './components/TopicsTable';


const appliesHeader = [
  { name: 'priority', text: '#', width: 1 },
  { name: 'title', text: 'Cím', width: 7 },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const topicsHeader = [
  { name: 'title', text: 'Cím', width: 4, sortBy: 'title' },
  { name: 'issuer', text: 'Kibocsátó', width: 2, sortBy: ['issuer.name', 'title'] },
  { name: 'subject', text: 'Tárgy', width: 2, sortBy: ['subject.name', 'title'] },
  { name: 'opertaions', text: 'Műveletek', width: 2 },
];

const TopicApply = ({ loading, topicApplies, topics }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Jelentkezéseim</DividingHeader>
      <AppliesTable header={appliesHeader} data={topicApplies} />
      <DividingHeader>Témák</DividingHeader>
      <TopicsTable header={topicsHeader} data={topics} />
    </div>
);

TopicApply.propTypes = {
  loading: PropTypes.bool.isRequired,
  topicApplies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => {
  const loading = !Meteor.subscribe('currentStudent').ready()
    || !Meteor.subscribe('currentStudentTopics').ready()
    || !Meteor.subscribe('currentStudentSubjects').ready()
    || !Meteor.subscribe('departments').ready()
    || !Meteor.subscribe('partners').ready();
  return {
    loading,
    topicApplies: lazyInit(loading, ClientFormatter.formatTopicApplies),
    topics: lazyInit(loading, ClientFormatter.formatTopics),
    // tutors: TutorCollection.find().fetch(),
    // consultants: ConsultantCollection.find().fetch()
  };
})(TopicApply);
