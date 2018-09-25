import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import SubjectCollection from '../../../../api/subjects';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import Subject from './components/Subject';


const Subjects = ({ loading, subjects }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Tárgyaim</DividingHeader>
      {subjects.map(subject => <Subject key={subject._id} subject={subject} />)}
    </div>
);

Subjects.propTypes = {
  loading: PropTypes.bool.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => {
  const loading = !Meteor.subscribe('currentStudent').ready()
    || !Meteor.subscribe('currentStudentSubjects').ready();
  return {
    loading,
    subjects: SubjectCollection.find().fetch(),
  };
})(Subjects);
