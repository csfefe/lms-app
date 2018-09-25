import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'semantic-ui-react';

import { USER_TYPE } from '../../../../constant';
import { ClientFormatter } from '../../../../util/Formatter';
import { lazyInit } from '../../../../util/util';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import InsertModal from './components/InsertModal';
import StudentCsvUpload from './components/StudentCsvUpload';
import StudentsTable from './components/StudentsTable';


const header = [
  { name: 'email', text: 'Email', width: 3, sortBy: 'email' },
  { name: 'name', text: 'Név', width: 3, sortBy: ['name', 'email'] },
  { name: 'neptun', text: 'Neptun kód', width: 1, sortBy: 'neptun' },
  { name: 'registered', text: 'Regisztrált', width: 1 },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Students = ({ loading, students }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Hallgatók</DividingHeader>
      <StudentCsvUpload placeholder="CSV fájlból..." accept=".csv" />
      <Divider horizontal>Vagy</Divider>
      <InsertModal formId="insertForm" entity="student" />
      <StudentsTable header={header} data={students} />
    </div>
);

Students.propTypes = {
  loading: PropTypes.bool.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => {
  const loading = !Meteor.subscribe('students').ready()
    || !Meteor.subscribe('registeredUsers', USER_TYPE.student).ready();
  return {
    loading,
    students: lazyInit(loading, ClientFormatter.formatStudents),
  };
})(Students);
