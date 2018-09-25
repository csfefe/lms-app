import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import { mapRecordsToOptions } from '../../../../../util/util';

import FormModal from '../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.partnerContact = props.partnerContact;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'partnerContacts.update',
      this.state.partnerContact._id,
      this.state.partnerContact,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { partnerContact, open, formError } = this.state;
    const { formId, entity, partners } = this.props;
    const partnerOptions = mapRecordsToOptions(partners, '_id', 'name');
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
              value={partnerContact.email}
              onChange={this.handleEntityChange}
              fluid
              required
            />
            <Form.Select
              label="Partner"
              placeholder="Partner"
              entity={entity}
              field="partnerId"
              options={partnerOptions}
              onChange={this.handleEntityChange}
              defaultValue={partnerContact.partnerId}
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
