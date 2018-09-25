import React from 'react';
import { Table } from 'semantic-ui-react';
import AbstractSortable from '../../../../../components/AbstractSortable';
import SortableTable from '../../../../../components/SortableTable';
import YesNoIcon from '../../../../../components/YesNoIcon';


export default class TopicClassificationTable extends AbstractSortable {
  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(({ name, email, title, neptun, registered }, index) => (
            <Table.Row key={index}>
              <Table.Cell>{name || email}</Table.Cell>
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>{neptun}</Table.Cell>
              <Table.Cell textAlign="center"><YesNoIcon condition={registered} /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}
