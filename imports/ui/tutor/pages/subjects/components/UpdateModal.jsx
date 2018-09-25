import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.subject = props.subject;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'subjects.updateCore',
      this.state.subject._id,
      this.state.subject,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { subject, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="write" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Tárgy szerkesztése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
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
            <Message error header="Szerkesztés sikertelen!" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Mégsem</Button>
          <Button primary type="submit" form={formId}>Szerkesztés</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
