import React from 'react';
import { Table } from 'semantic-ui-react';

import AbstractSortable from '../../../../components/AbstractSortable';
import Operations from '../../../../components/Operations';
import SortableTable from '../../../../components/SortableTable';
import YesNoIcon from '../../../../components/YesNoIcon';

import DocumentsModal from './DocumentsModal';
import UpdateModal from './UpdateModal';


export default class SubjectsTable extends AbstractSortable {
  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(({ core, documents }) => (
            <Table.Row key={core._id}>
              <Table.Cell>{core.name}</Table.Cell>
              <Table.Cell>{core.code}</Table.Cell>
              <Table.Cell textAlign="center"><YesNoIcon condition={core.base} /></Table.Cell>
              <Table.Cell textAlign="center"><YesNoIcon condition={core.topic} /></Table.Cell>
              <Table.Cell>
                <Operations
                  _id={core._id}
                  removeMethod="subjects.remove"
                  removeContent="Biztosan törli a tárgyat?"
                >
                  <DocumentsModal
                    formId="documentsForm"
                    _id={core._id}
                    documents={documents}
                  />
                  <UpdateModal formId="updateForm" entity="subject" subject={core} />
                </Operations>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}
