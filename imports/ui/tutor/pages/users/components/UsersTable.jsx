import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Confirm, Table } from 'semantic-ui-react';

import { USER_TYPE } from '../../../../../constant';

import AbstractModal from '../../../../components/AbstractModal';
import AbstractSortable from '../../../../components/AbstractSortable';
import SortableTable from '../../../../components/SortableTable';


export default class UsersTable extends AbstractSortable {
  constructor(props) {
    super(props);
    this.userTypeMap = {};
    this.userTypeMap[USER_TYPE.student] = 'Hallgató';
    this.userTypeMap[USER_TYPE.consultant] = 'Konzulens';
    this.userTypeMap[USER_TYPE.partnerContact] = 'Kapcsolattartó';
    this.userTypeMap[USER_TYPE.tutor] = 'Oktató';
  }

  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(({ _id, services, emails, profile, type }) => (
            <Table.Row key={_id}>
              <Table.Cell>{emails ? emails[0].address : services.google.email}</Table.Cell>
              <Table.Cell>{profile.name}</Table.Cell>
              <Table.Cell>{this.userTypeMap[type]}</Table.Cell>
              <Table.Cell>
                <Operations _id={_id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}

class Operations extends AbstractModal {
  handleRemove = () => {
    Meteor.call('users.remove', this.props._id, (error) => {
      if (error) {
        console.error(error);
      }
      this.handleClose();
    });
  };

  render() {
    return (
      <div>
        <Button color="red" icon="trash" onClick={this.handleOpen} fluid />
        <Confirm
          size="tiny"
          confirmButton="Igen"
          cancelButton="Mégsem"
          content="Biztosan törli a felhasználót?"
          open={this.state.open}
          onCancel={this.handleClose}
          onConfirm={this.handleRemove}
        />
      </div>
    );
  }
}
