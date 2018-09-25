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

import ConsultantsTable from './components/ConsultantsTable';
import InsertModal from './components/InsertModal';


const header = [
  { name: 'email', text: 'Email', width: 3, sortBy: 'email' },
  { name: 'name', text: 'Név', width: 2, sortBy: 'name' },
  { name: 'partner', text: 'Partner', width: 2, sortBy: 'partner' },
  { name: 'registered', text: 'Regisztrált', width: 1 },
  { name: 'operations', text: 'Műveletek', width: 2 },
];

const Consultants = ({ loading, consultants, partners }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Konzulensek</DividingHeader>
      {_.isEmpty(partners) ?
        <Warn /> :
        <Data consultants={consultants} partners={partners} />}
    </div>
);

Consultants.propTypes = {
  loading: PropTypes.bool.isRequired,
  consultants: PropTypes.arrayOf(PropTypes.shape).isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const Data = ({ consultants, partners }) => (
  <div>
    <InsertModal formId="insertForm" entity="consultant" partners={partners} />
    <ConsultantsTable header={header} data={consultants} partners={partners} />
  </div>
);

Data.propTypes = {
  consultants: PropTypes.arrayOf(PropTypes.shape).isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const Warn = () => (
  <Message
    header="Nem adható hozzá konzulens!"
    content="Az adatbázis nem tartalmaz partnert."
    warning
  />
);

export default withTracker(() => {
  const loading = !Meteor.subscribe('consultants').ready()
    || !Meteor.subscribe('partners').ready()
    || !Meteor.subscribe('registeredUsers', USER_TYPE.consultant).ready();
  return {
    loading,
    consultants: lazyInit(loading, ClientFormatter.formatConsultants),
    partners: PartnerCollection.find().fetch(),
  };
})(Consultants);
