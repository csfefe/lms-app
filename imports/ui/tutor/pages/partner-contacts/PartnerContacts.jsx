import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';
import { Message } from 'semantic-ui-react';

import PartnerCollection from '../../../../api/partners';

import { USER_TYPE } from '../../../../constant';
import { ClientFormatter } from '../../../../util/Formatter';
import { lazyInit } from '../../../../util/util';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import InsertModal from './components/InsertModal';
import PartnerContactsTable from './components/PartnerContactsTable';


const header = [
  { name: 'email', text: 'Email', width: 3, sortBy: 'email' },
  { name: 'name', text: 'Név', width: 2, sortBy: 'name' },
  { name: 'partner', text: 'Partner', width: 2, sortBy: 'partner' },
  { name: 'registered', text: 'Regisztrált', width: 1 },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const PartnerContacts = ({ loading, partnerContacts, partners }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Kapcsolattartók</DividingHeader>
      {_.isEmpty(partners) ?
        <Warn /> :
        <Data partnerContacts={partnerContacts} partners={partners} />}
    </div>
);

PartnerContacts.propTypes = {
  loading: PropTypes.bool.isRequired,
  partnerContacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape).isRequired,
};


const Data = ({ partnerContacts, partners }) => (
  <div>
    <InsertModal formId="insertForm" entity="partnerContact" partners={partners} />
    <PartnerContactsTable header={header} data={partnerContacts} partners={partners} />
  </div>
);

Data.propTypes = {
  partnerContacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const Warn = () => (
  <Message
    header="Nem adható hozzá kapcsolattartó!"
    content="Az adatbázis nem tartalmaz partnert."
    warning
  />
);

export default withTracker(() => {
  const loading = !Meteor.subscribe('partnerContacts').ready()
    || !Meteor.subscribe('registeredUsers', USER_TYPE.partnerContact).ready()
    || !Meteor.subscribe('partners').ready();
  return {
    loading,
    partnerContacts: lazyInit(loading, ClientFormatter.formatPartnerContacts),
    partners: PartnerCollection.find().fetch(),
  };
})(PartnerContacts);
