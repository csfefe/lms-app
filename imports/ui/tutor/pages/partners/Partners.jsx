import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import PartnerCollection from '../../../../api/partners';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import InsertModal from './components/InsertModal';
import PartnersTable from './components/PartnersTable';


const header = [
  { name: 'name', text: 'Név', width: 8, sortBy: 'name' },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Partners = ({ loading, partners }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Partnerek</DividingHeader>
      <InsertModal formId="insertForm" entity="partner" />
      <PartnersTable header={header} data={partners} />
    </div>
);

Partners.propTypes = {
  loading: PropTypes.bool.isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTracker(() => ({
  loading: !Meteor.subscribe('partners').ready(),
  partners: PartnerCollection.find().fetch(),
}))(Partners);
