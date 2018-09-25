import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import DividingHeader from '../../../components/DividingHeader';
import FullPageLoader from '../../../components/FullPageLoader';

import UsersTable from './components/UsersTable';


const header = [
  { name: 'email', text: 'Email', width: 4, sortBy: 'email' },
  { name: 'name', text: 'Név', width: 3, sortBy: 'name' },
  { name: 'type', text: 'Típus', width: 2, sortBy: ['type', 'email'] },
  { name: 'operations', text: 'Műveletek', width: 1 },
];


const Users = ({ loading, users }) => (
  loading ?
    <FullPageLoader /> :
    <div>
      <DividingHeader>Felhasználók</DividingHeader>
      <UsersTable header={header} data={users} />
    </div>
);

Users.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
};


export default withTracker(() => ({
  loading: !Meteor.subscribe('allUser').ready(),
  users: Meteor.users.find().fetch(),
}))(Users);
