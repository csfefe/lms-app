import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';

import CelledTable from '../../../../../components/CelledTable';

import UpdateModal from './UpdateModal';


class TopicClassificationTable extends Component {
  state = {
    classification: this.props.classification,
    loading: false,
    error: false,
    success: false,
  };

  static getRowColor(topic, student) {
    if (!student) {
      // Nincs besorolt hallgato
      return { positive: false, warning: false, negative: false };
    }
    if (_.isEmpty(student.topicApplies)) {
      // Nincs temajelentkezes
      return { positive: true, warning: false, negative: false };
    }
    const priority = student.topicApplies.indexOf(topic._id);
    switch (priority) {
      case 0:
        // Legmagasabb prioritasu tema
        return { positive: true, warning: false, negative: false };
      case student.topicApplies.length - 1:
        // Legalacsonyabb prioritasu tema
        return { positive: false, warning: true, negative: false };
      case -1:
        // Jelentkezesek kozott nem szereplo tema
        return { positive: false, warning: false, negative: true };
      default:
        // Koztes prioritasu tema
        return { positive: false, warning: false, negative: false };
    }
  }

  handleUpdate = (pos, student) => {
    this.state.classification[pos].student = student;
    this.props.onUpdate();
  };

  handleRemove = (e, { pos }) => {
    e.preventDefault();
    delete this.state.classification[pos].student;
    this.props.onUpdate();
  };

  formatClassificationToServer = () => this.state.classification
    .filter(({ student }) => student)
    .map(({ topic, student }) => ({ topicId: topic._id, studentId: student._id }));

  handleSave = () => {
    this.setState({ loading: true });
    const { state } = this;
    Meteor.call('students.unsetTopics');
    Meteor.call('students.setTopics', this.formatClassificationToServer(), (error) => {
      if (error) {
        console.error(error);
        state.error = true;
        state.success = false;
      } else {
        state.error = false;
        state.success = true;
      }
      state.loading = false;
      this.setState(state);
    });
  };

  render() {
    const { classification, loading } = this.state;
    const { students } = this.props;
    return (
      <CelledTable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>Téma</Table.HeaderCell>
            <Table.HeaderCell width={3}>Hallgató</Table.HeaderCell>
            <Table.HeaderCell width={2}>Műveletek</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{
          classification.map(({ topic, student }, index) => {
            const { positive, warning, negative } = TopicClassificationTable.getRowColor(
              topic,
              student,
            );
            return (
              <Table.Row key={index} positive={positive} warning={warning} negative={negative}>
                <Table.Cell>{topic.title}</Table.Cell>
                <Table.Cell>{student ? student.name || student.email : null}</Table.Cell>
                <Table.Cell>
                  <Button.Group fluid>
                    <UpdateModal
                      formId="updateStudent"
                      pos={index}
                      students={students}
                      current={student}
                      onUpdate={this.handleUpdate}
                    />
                    <Button
                      color="red"
                      icon="trash"
                      pos={index}
                      disabled={!student}
                      onClick={this.handleRemove}
                    />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            );
          })
        }
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>
              <Button icon="save" loading={loading} onClick={this.handleSave} fluid primary />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </CelledTable>
    );
  }
}

export default TopicClassificationTable;
