import React from 'react';
import { Table } from 'semantic-ui-react';

import AbstractSortable from '../../../../components/AbstractSortable';
import Operations from '../../../../components/Operations';
import SortableTable from '../../../../components/SortableTable';

import SupervisorsModal from './SupervisorsModal';
import UpdateModal from './UpdateModal';


export default class TopicsTable extends AbstractSortable {
  render() {
    const { subjects, issuers, tutors, consultants } = this.props;
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(topic => (
            <Table.Row key={topic._id}>
              <Table.Cell>{topic.title}</Table.Cell>
              <Table.Cell>{topic.issuer.name}</Table.Cell>
              <Table.Cell>{topic.subject.name}</Table.Cell>
              <Table.Cell>
                <Operations
                  _id={topic._id}
                  removeMethod="topics.remove"
                  removeContent="Biztosan törli a témát?"
                >
                  <SupervisorsModal
                    formId="supervisorsForm"
                    _id={topic._id}
                    partnerId={topic.partnerId}
                    tutorId={topic.tutorId}
                    consultantId={topic.consultantId}
                    tutors={tutors}
                    consultants={consultants}
                  />
                  <UpdateModal
                    formId="updateForm"
                    entity="topic"
                    topic={topic}
                    issuers={issuers}
                    subjects={subjects}
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
