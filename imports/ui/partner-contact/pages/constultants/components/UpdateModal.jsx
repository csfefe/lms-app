import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.consultant = props.consultant;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.state.consultant.partnerId = Meteor.user().profile.partnerId;
    Meteor.call(
      'consultants.update',
      this.state.consultant._id,
      this.state.consultant,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { consultant, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="write" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Konzulens szerkesztése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Input
              label="Email"
              placeholder="Email"
              entity={entity}
              field="email"
              value={consultant.email}
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
