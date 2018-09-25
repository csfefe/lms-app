import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import { mapRecordsToOptions } from '../../../../../util/util';

import FormModal from '../../../../components/FormModal';


export default class InsertModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.topic = this.init();
  }

  init = () => ({ title: '', issuerId: '', subjectId: '', description: '' });

  handleSuccess = () => this.setState({ open: false, formError: false, topic: this.init() });

  handleInsert = (e) => {
    e.preventDefault();
    Meteor.call('topics.insert', this.state.topic, this.submitCallback(this.handleSuccess));
  };

  render() {
    const { topic, open, formError } = this.state;
    const { formId, entity, subjects } = this.props;
    const subjectOptions = mapRecordsToOptions(subjects, '_id', 'name');
    const trigger = <Button icon="add" onClick={this.handleOpen} fluid primary />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Téma hozzáadása</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleInsert} error={formError}>
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
              label="Tárgy"
              placeholder="Tárgy"
              entity={entity}
              field="subjectId"
              options={subjectOptions}
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
            <Message header="Hozzáadás sikertelen!" error />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Mégsem</Button>
          <Button type="submit" form={formId} primary>Hozzáadás</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
