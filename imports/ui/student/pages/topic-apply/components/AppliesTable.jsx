import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import AbstractSortable from '../../../../components/AbstractSortable';

import CelledTable from '../../../../components/CelledTable';


export default class AppliesTable extends AbstractSortable {
  handleClick = method => (e, { _id }) => {
    e.preventDefault();
    Meteor.call(method, _id, (error) => {
      if (error) {
        console.error(error);
      }
    });
  };

  render() {
    this.fetchDataIfNeeded();
    return (
      <CelledTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(({ _id, title }, index) => (
            <Table.Row key={index}>
              <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>
                <Button.Group fluid>
                  <Button
                    _id={_id}
                    icon="arrow up"
                    onClick={this.handleClick('students.moveUpTopicApply')}
                  />
                  <Button
                    _id={_id}
                    icon="arrow down"
                    onClick={this.handleClick('students.moveDownTopicApply')}
                  />
                  <Button
                    _id={_id}
                    color="red"
                    icon="trash"
                    onClick={this.handleClick('students.removeTopicApply')}
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </CelledTable>
    );
  }
}
