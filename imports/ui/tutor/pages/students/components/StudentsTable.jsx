import React from 'react';
import { Table } from 'semantic-ui-react';

import AbstractSortable from '../../../../components/AbstractSortable';
import Operations from '../../../../components/Operations';
import SortableTable from '../../../../components/SortableTable';
import YesNoIcon from '../../../../components/YesNoIcon';

import UpdateModal from './UpdateModal';


export default class StudentsTable extends AbstractSortable {
  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(student => (
            <Table.Row key={student._id}>
              <Table.Cell>{student.email}</Table.Cell>
              <Table.Cell>{student.name}</Table.Cell>
              <Table.Cell>{student.neptun}</Table.Cell>
              <Table.Cell textAlign="center">
                <YesNoIcon condition={student.registered} />
              </Table.Cell>
              <Table.Cell>
                <Operations
                  _id={student._id}
                  removeMethod="students.remove"
                  removeContent="Biztosan törli a hallgatót?"
                >
                  <UpdateModal
                    formId="updateForm"
                    entity="student"
                    student={student}
                  />
                </Operations>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}
