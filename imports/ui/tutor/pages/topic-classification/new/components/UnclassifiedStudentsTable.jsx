import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';

import CelledTable from '../../../../../components/CelledTable';
import YesNoIcon from '../../../../../components/YesNoIcon';


const UnclassifiedStudentsTable = ({ students, topics }) => (
  <CelledTable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={3}>Név</Table.HeaderCell>
        <Table.HeaderCell width={1}>Regisztrált</Table.HeaderCell>
        <Table.HeaderCell width={6}>Témajelentkezések</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {students.map((student, studentIndex) => (
        <Table.Row key={studentIndex}>
          <Table.Cell>{student.name || student.email}</Table.Cell>
          <Table.Cell textAlign="center"><YesNoIcon condition={student.registered} /></Table.Cell>
          <Table.Cell>{
            student.topicApplies.map((topicId, topicIndex) => (
              <p key={topicIndex}>
                <b>{`#${topicIndex + 1}`}</b> {_.find(topics, { _id: topicId }).title}
              </p>
            ))
          }
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </CelledTable>
);

UnclassifiedStudentsTable.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape).isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default UnclassifiedStudentsTable;
