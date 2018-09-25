import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.partner = props.partner;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'partners.update',
      this.state.partner._id,
      this.state.partner,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { partner, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="write" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Partner szerkesztése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Input
              label="Név"
              placeholder="Név"
              entity={entity}
              field="name"
              value={partner.name}
              onChange={this.handleEntityChange}
              fluid
              required
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
