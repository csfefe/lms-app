import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import { USER_TYPE } from '../../../../constant';

import { ClientFormatter } from '../../../../util/Formatter';
import { lazyInit } from '../../../../util/util';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import InsertModal from './components/InsertModal';
import TutorsTable from './components/TutorsTable';


const header = [
  { name: 'email', text: 'Email', width: 3, sortBy: 'email' },
  { name: 'name', text: 'Név', width: 3, sortBy: 'name' },
  { name: 'registered', text: 'Regisztrált', width: 2 },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Tutors = ({ loading, tutors }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Oktatók</DividingHeader>
      <InsertModal formId="insertForm" entity="tutor" />
      <TutorsTable header={header} data={tutors} />
    </div>
);

Tutors.propTypes = {
  loading: PropTypes.bool.isRequired,
  tutors: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => {
  const loading = !Meteor.subscribe('tutors').ready()
    || !Meteor.subscribe('registeredUsers', USER_TYPE.tutor).ready();
  return {
    loading,
    tutors: lazyInit(loading, ClientFormatter.formatTutors),
  };
})(Tutors);
