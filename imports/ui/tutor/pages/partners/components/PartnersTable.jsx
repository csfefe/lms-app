import React from 'react';
import { Table } from 'semantic-ui-react';

import AbstractSortable from '../../../../components/AbstractSortable';
import Operations from '../../../../components/Operations';
import SortableTable from '../../../../components/SortableTable';

import UpdateModal from './UpdateModal';


export default class PartnersTable extends AbstractSortable {
  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(partner => (
            <Table.Row key={partner._id}>
              <Table.Cell>{partner.name}</Table.Cell>
              <Table.Cell>
                <Operations
                  _id={partner._id}
                  removeMethod="partners.remove"
                  removeContent="Biztosan törli a partnert?"
                >
                  <UpdateModal formId="updateForm" entity="partner" partner={partner} />
                </Operations>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}
