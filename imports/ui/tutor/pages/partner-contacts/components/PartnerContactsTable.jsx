import _ from 'lodash';
import React from 'react';
import { Table } from 'semantic-ui-react';
import AbstractSortable from '../../../../components/AbstractSortable';

import Operations from '../../../../components/Operations';
import SortableTable from '../../../../components/SortableTable';
import YesNoIcon from '../../../../components/YesNoIcon';

import UpdateModal from './UpdateModal';


export default class DepartmentsTable extends AbstractSortable {
  render() {
    // TODO: client formatter
    this.fetchDataIfNeeded();
    const { partners } = this.props;
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(partnerContact => (
            <Table.Row key={partnerContact._id}>
              <Table.Cell>{partnerContact.email}</Table.Cell>
              <Table.Cell>{partnerContact.name}</Table.Cell>
              <Table.Cell>
                {_.get(_.find(partners, { _id: partnerContact.partnerId }), 'name')}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <YesNoIcon condition={partnerContact.registered} />
              </Table.Cell>
              <Table.Cell>
                <Operations
                  _id={partnerContact._id}
                  removeMethod="partnerContacts.remove"
                  removeContent="Biztosan törli a kapcsolattartót?"
                >
                  <UpdateModal
                    formId="updateForm"
                    entity="partnerContact"
                    partnerContact={partnerContact}
                    partners={partners}
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
