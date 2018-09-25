import React from 'react';
import { Table } from 'semantic-ui-react';

import AbstractSortable from '../../../../components/AbstractSortable';
import Operations from '../../../../components/Operations';
import SortableTable from '../../../../components/SortableTable';

import ConsultantModal from './ConsultantModal';
import UpdateModal from './UpdateModal';


export default class TopicsTable extends AbstractSortable {
  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(topic => (
            <Table.Row key={topic._id}>
              <Table.Cell>{topic.title}</Table.Cell>
              <Table.Cell>{topic.subject.name}</Table.Cell>
              <Table.Cell>
                <Operations
                  _id={topic._id}
                  removeMethod="topics.remove"
                  removeContent="Biztosan törli a témát?"
                >
                  <ConsultantModal
                    formId="consultantsForm"
                    topicId={topic._id}
                    consultantId={topic.consultantId}
                    consultants={this.props.consultants}
                  />
                  <UpdateModal
                    formId="updateForm"
                    entity="topic"
                    topic={topic}
                    subjects={this.props.subjects}
                  />
                </Operations>
              </Table.Cell>
            </Table.Row>
          ))
          }
        </Table.Body>
      </SortableTable>
    );
  }
}
