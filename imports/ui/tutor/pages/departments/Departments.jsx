import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import DepartmentCollection from '../../../../api/departments';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import DepartmentsTable from './components/DepartmentsTable';
import InsertModal from './components/InsertModal';


const header = [
  { name: 'name', text: 'Név', width: 8, sortBy: 'name' },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Departments = ({ loading, departments }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Tanszékek</DividingHeader>
      <InsertModal formId="insertForm" entity="department" />
      <DepartmentsTable header={header} data={departments} />
    </div>
);

Departments.propTypes = {
  loading: PropTypes.bool.isRequired,
  departments: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => ({
  loading: !Meteor.subscribe('departments').ready(),
  departments: DepartmentCollection.find().fetch(),
}))(Departments);
