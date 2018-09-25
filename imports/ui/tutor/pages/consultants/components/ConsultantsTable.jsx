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
    const { partners } = this.props;
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(consultant => (
            <Table.Row key={consultant._id}>
              <Table.Cell>{consultant.email}</Table.Cell>
              <Table.Cell>{consultant.name}</Table.Cell>
              <Table.Cell>
                {_.get(_.find(partners, { _id: consultant.partnerId }), 'name')}
              </Table.Cell>
              <Table.Cell textAlign="center"><YesNoIcon
                condition={consultant.registered}
              />
              </Table.Cell>
              <Table.Cell>
                <Operations
                  _id={consultant._id}
                  removeMethod="consultants.remove"
                  removeContent="Biztosan törli a konzulenst?"
                >
                  <UpdateModal
                    formId="updateForm"
                    entity="consultant"
                    consultant={consultant}
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
