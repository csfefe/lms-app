import React from 'react';
import { Table } from 'semantic-ui-react';
import AbstractSortable from '../../../../components/AbstractSortable';

import Operations from '../../../../components/Operations';
import SortableTable from '../../../../components/SortableTable';

import UpdateModal from './UpdateModal';


export default class DepartmentsTable extends AbstractSortable {
  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(department => (
            <Table.Row key={department._id}>
              <Table.Cell>{department.name}</Table.Cell>
              <Table.Cell>
                <Operations
                  _id={department._id}
                  removeMethod="departments.remove"
                  removeContent="Biztosan törli a tanszéket?"
                >
                  <UpdateModal formId="updateForm" entity="department" department={department} />
                </Operations>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}
