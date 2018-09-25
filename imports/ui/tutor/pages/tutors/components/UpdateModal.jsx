import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.tutor = props.tutor;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'tutors.update',
      this.state.tutor._id,
      this.state.tutor,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { tutor, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="write" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Kapcsolattartó szerkesztése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Input
              label="Email"
              placeholder="Email"
              entity={entity}
              field="email"
              value={tutor.email}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Message error header="Szerkesztés sikertelen!" />
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
