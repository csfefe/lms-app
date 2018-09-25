import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import { ClientFormatter } from '../../../../util/Formatter';
import { lazyInit } from '../../../../util/util';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import ReviewsTable from './components/ReviewsTable';


const header = [
  { name: 'topic', text: 'Téma', width: 4, sortBy: 'topic.title' },
  { name: 'student', text: 'Hallgató', width: 3, sortBy: ['student.name', 'student.email'] },
  { name: 'reviewed', text: 'Értékelve', width: 1 },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Review = ({ loading, reviews }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Értékelés</DividingHeader>
      <ReviewsTable header={header} data={reviews} />
    </div>
);

Review.propTypes = {
  loading: PropTypes.bool.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => {
  const loading = !Meteor.subscribe('currentConsultantTopics').ready()
    || !Meteor.subscribe('students').ready();
  return {
    loading,
    reviews: lazyInit(loading, ClientFormatter.formatConsultantReviews),
  };
})(Review);
