import React from 'react';
import { Table } from 'semantic-ui-react';

import AbstractSortable from '../../../../components/AbstractSortable';
import Operations from '../../../../components/Operations';
import SortableTable from '../../../../components/SortableTable';
import YesNoIcon from '../../../../components/YesNoIcon';

import UpdateModal from './UpdateModal';


export default class TutorsTable extends AbstractSortable {
  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(tutor => (
            <Table.Row key={tutor._id}>
              <Table.Cell>{tutor.email}</Table.Cell>
              <Table.Cell>{tutor.name}</Table.Cell>
              <Table.Cell textAlign="center"><YesNoIcon condition={tutor.registered} /></Table.Cell>
              <Table.Cell>
                <Operations
                  _id={tutor._id}
                  removeMethod="tutors.remove"
                  removeContent="Biztosan törli az oktatót?"
                >
                  <UpdateModal formId="updateForm" entity="tutor" tutor={tutor} />
                </Operations>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}
