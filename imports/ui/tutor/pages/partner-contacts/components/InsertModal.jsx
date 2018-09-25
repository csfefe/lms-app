import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import { mapRecordsToOptions } from '../../../../../util/util';

import FormModal from '../../../../components/FormModal';


export default class InsertModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.partnerContact = this.init();
  }

  init = () => ({ email: '', partnerId: '' });

  handleSuccess = () => this.setState({
    open: false,
    formError: false,
    partnerContact: this.init(),
  });

  handleInsert = (e) => {
    e.preventDefault();
    Meteor.call(
      'partnerContacts.insert',
      this.state.partnerContact,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { partnerContact, open, formError } = this.state;
    const { formId, entity, partners } = this.props;
    const partnerOptions = mapRecordsToOptions(partners, '_id', 'name');
    const trigger = <Button icon="add" onClick={this.handleOpen} fluid primary />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Kapcsolattartó hozzáadása</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleInsert} error={formError}>
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
              fluid
              required
            />
            <Message error header="Hozzáadás sikertelen!" />
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
