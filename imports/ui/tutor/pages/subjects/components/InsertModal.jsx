import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class InsertModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.subject = this.init();
  }

  init = () => ({ name: '', code: '', base: false, topic: false });

  handleSuccess = () => this.setState({ open: false, formError: false, subject: this.init() });

  handleInsert = (e) => {
    e.preventDefault();
    Meteor.call('subjects.insert', this.state.subject, this.submitCallback(this.handleSuccess));
  };

  render() {
    const { subject, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="add" onClick={this.handleOpen} fluid primary />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Tárgy hozzáadása</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleInsert} error={formError}>
            <Form.Input
              label="Név"
              placeholder="Név"
              entity={entity}
              field="name"
              value={subject.name}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Form.Input
              label="Kód"
              placeholder="Kód"
              entity={entity}
              field="code"
              value={subject.code}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Form.Checkbox
              label="Alap tárgy"
              entity={entity}
              field="base"
              checked={subject.base}
              onChange={this.handleCheckboxChange}
            />
            <Form.Checkbox
              label="Téma tárgy"
              entity={entity}
              field="topic"
              checked={subject.topic}
              onChange={this.handleCheckboxChange}
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
