import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import { mapRecordsToOptions } from '../../../../../util/util';

import FormModal from '../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.topic = props.topic;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'topics.update',
      this.state.topic._id,
      this.state.topic,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { topic, open, formError } = this.state;
    const { formId, entity, subjects, issuers } = this.props;
    const subjectOptions = mapRecordsToOptions(subjects, '_id', 'name');
    const issuerOptions = mapRecordsToOptions(issuers, '_id', 'name');
    const trigger = <Button icon="write" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Téma szerkesztése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Input
              label="Cím"
              placeholder="Cím"
              entity={entity}
              field="title"
              value={topic.title}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Form.Select
              label="Kibocsátó"
              placeholder="Kibocsátó"
              entity={entity}
              field="issuerId"
              options={issuerOptions}
              defaultValue={topic.issuer._id}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Form.Select
              label="Tárgy"
              placeholder="Tárgy"
              entity={entity}
              field="subjectId"
              options={subjectOptions}
              defaultValue={topic.subjectId}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Form.TextArea
              label="Leírás"
              placeholder="A téma leírása..."
              entity={entity}
              field="description"
              value={topic.description}
              onChange={this.handleEntityChange}
            />
            <Message header="Szerkesztés sikertelen!" error />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Mégsem</Button>
          <Button type="submit" form={formId} primary>Szerkesztés</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
