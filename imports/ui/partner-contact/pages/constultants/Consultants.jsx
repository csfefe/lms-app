import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import { USER_TYPE } from '../../../../constant';

import { ClientFormatter } from '../../../../util/Formatter';
import { lazyInit } from '../../../../util/util';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import ConsultantsTable from './components/ConsultantsTable';
import InsertModal from './components/InsertModal';


const header = [
  { name: 'email', text: 'Email', width: 3, sortBy: 'email' },
  { name: 'name', text: 'Név', width: 3, sortBy: 'name' },
  { name: 'registered', text: 'Regisztrált', width: 2 },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Consultants = ({ loading, consultants }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Konzulensek</DividingHeader>
      <InsertModal formId="insertForm" entity="consultant" />
      <ConsultantsTable header={header} data={consultants} />
    </div>
);

Consultants.propTypes = {
  loading: PropTypes.bool.isRequired,
  consultants: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => {
  const loading = !Meteor.subscribe('currentPartnerConsultants').ready()
    || !Meteor.subscribe('registeredUsers', USER_TYPE.consultant).ready();
  return {
    loading,
    consultants: lazyInit(loading, ClientFormatter.formatConsultants),
  };
})(Consultants);
