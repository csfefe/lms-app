import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';
import { ClientFormatter } from '../../../../util/Formatter';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import InsertModal from './components/InsertModal';
import SubjectsTable from './components/SubjectsTable';


const header = [
  { name: 'name', text: 'Név', width: 4, sortBy: 'name' },
  { name: 'code', text: 'Kód', width: 2, sortBy: 'code' },
  { name: 'base', text: 'Alap tárgy', width: 1 },
  { name: 'topic', text: 'Téma tárgy', width: 1 },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Subjects = ({ loading, subjects }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Tárgyak</DividingHeader>
      <InsertModal formId="insertForm" entity="subject" />
      <SubjectsTable header={header} data={subjects} />
    </div>
);

Subjects.propTypes = {
  loading: PropTypes.bool.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => ({
  loading: !Meteor.subscribe('subjects').ready(),
  subjects: ClientFormatter.formatSubjects(),
}))(Subjects);
