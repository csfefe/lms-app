import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import AbstractSortable from '../../../../components/AbstractSortable';
import SortableTable from '../../../../components/SortableTable';

import DetailsModal from './DetailsModal';


export default class TopicsTable extends AbstractSortable {
  handleInsert = (e, { _id }) => {
    e.preventDefault();
    Meteor.call('students.insertTopicApply', _id, (error) => {
      if (error) {
        console.error(error);
      }
      this.forceUpdate();
    });
  };

  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(topic => (
            <Table.Row key={topic._id}>
              <Table.Cell>{topic.title}</Table.Cell>
              <Table.Cell>{topic.issuer.name}</Table.Cell>
              <Table.Cell>{topic.subject.name}</Table.Cell>
              <Table.Cell>
                <Button.Group fluid>
                  <DetailsModal topic={topic} />
                  <Button icon="checkmark" _id={topic._id} onClick={this.handleInsert} primary />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}
