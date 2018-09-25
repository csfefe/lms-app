import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Button } from 'semantic-ui-react';

import { ClientFormatter } from '../../../../../util/Formatter';
import { lazyInit } from '../../../../../util/util';

import DividingHeader from '../../../../components/DividingHeader';

import TopicClassificationTable from './components/TopicClassificationTable';


const header = [
  { name: 'name', text: 'Név', width: 3, sortBy: ['name', 'email'] },
  { name: 'title', text: 'Cím', width: 5, sortBy: 'title' },
  { name: 'neptun', text: 'Neptun kód', width: 1, sortBy: 'neptun' },
  { name: 'registered', text: 'Regisztrált', width: 1 },
];

const TopicClassification = props => (
  <div>
    <Button
      icon="write"
      onClick={() => props.history.push(`${props.history.location.pathname}/new`)}
      primary
      fluid
    />
    <DividingHeader>Aktuális besorolás</DividingHeader>
    <TopicClassificationTable header={header} data={props.classification} />
  </div>
);

export default withTracker(() => {
  const loading = !Meteor.subscribe('students').ready() || !Meteor.subscribe('topics').ready();
  return {
    loading,
    classification: lazyInit(loading, ClientFormatter.formatTopicClassification),
  };
})(TopicClassification);
