import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class ReviewModal extends FormModal {
  constructor(props) {
    super(props);
    this.init();
  }

  init = () => (this.state.review = { grade: '', text: '' });

  gradeOptions = _.range(1, 6).map(grade => ({ value: grade, text: grade }));

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'students.setTopicReview', this.props.studentId, this.state.review,
      this.submitCallback(this.handleSuccess),
    );
  };

  componentWillMount() {
    const { review } = this.props;
    if (review) {
      this.state.review = review;
    }
  }

  render() {
    const { review, open, formError } = this.state;
    const { formId, entity, disabled } = this.props;
    const trigger = <Button icon="write" disabled={disabled} onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Értékelés frissítése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Select
              label="Érdemjegy"
              placeholder="Érdemjegy"
              entity={entity}
              field="grade"
              options={this.gradeOptions}
              defaultValue={review.grade}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Form.TextArea
              label="Értékelés"
              placeholder="Értékelés szövege..."
              entity={entity}
              field="text"
              value={review.text}
              onChange={this.handleEntityChange}
              required
            />
            <Message header="Frissítés sikertelen!" error />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Mégsem</Button>
          <Button type="submit" form={formId} primary>Frissítés</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
