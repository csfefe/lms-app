import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Confirm, Table } from 'semantic-ui-react';

import AbstractModal from '../../../../components/AbstractModal';
import AbstractSortable from '../../../../components/AbstractSortable';
import SortableTable from '../../../../components/SortableTable';
import YesNoIcon from '../../../../components/YesNoIcon';

import ReviewModal from './ReviewModal';


export default class ReviewsTable extends AbstractSortable {
  render() {
    this.fetchDataIfNeeded();
    return (
      <SortableTable>
        {this.renderHeader()}
        <Table.Body>
          {this.state.data.map(({ topic, student }) => (
            <Table.Row key={topic._id}>
              <Table.Cell>{topic.title}</Table.Cell>
              <Table.Cell>{student.name || student.email}</Table.Cell>
              <Table.Cell textAlign="center">
                <YesNoIcon condition={student ? !!student.review : false} />
              </Table.Cell>
              <Table.Cell><Operations student={student} /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </SortableTable>
    );
  }
}

class Operations extends AbstractModal {
  handleRemove = () => {
    Meteor.call('students.unsetTopicReview', this.props.student._id, (error) => {
      if (error) {
        console.error(error);
      } else {
        this.forceUpdate();
      }
      this.handleClose();
    });
  };

  render() {
    const { student } = this.props;
    const editDisabled = student === undefined;
    const removeDisabled = !student.review;
    const studentId = editDisabled ? null : student._id;
    const review = editDisabled ? null : student.review;
    return (
      <Button.Group fluid>
        <ReviewModal
          formId="reviewForm"
          entity="review"
          disabled={editDisabled}
          studentId={studentId}
          review={review}
        />
        <Button color="red" icon="trash" disabled={removeDisabled} onClick={this.handleOpen} />
        <Confirm
          size="tiny"
          confirmButton="Igen"
          cancelButton="Mégsem"
          content="Biztosan törli az értékelést?"
          open={this.state.open}
          onCancel={this.handleClose}
          onConfirm={this.handleRemove}
        />
      </Button.Group>
    );
  }
}
