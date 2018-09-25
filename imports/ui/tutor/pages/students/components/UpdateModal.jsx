import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  state = { student: this.props.student };

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'students.update',
      this.state.student._id,
      this.state.student,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { student, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="write" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Hallgató szerkesztése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Input
              label="Email"
              placeholder="Email"
              entity={entity}
              field="email"
              value={student.email}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Form.Input
              label="Neptun kód"
              placeholder="Neptun kód"
              entity={entity}
              field="neptun"
              value={student.neptun}
              onChange={this.handleEntityChange}
              fluid
              required
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
