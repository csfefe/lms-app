import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class InsertModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.tutor = this.init();
  }

  init = () => ({ email: '' });

  handleSuccess = () => this.setState({ open: false, formError: false, subject: this.init() });

  handleInsert = (e) => {
    e.preventDefault();
    Meteor.call('tutors.insert', this.state.tutor, this.submitCallback(this.handleSuccess));
  };

  render() {
    const { tutor, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="add" onClick={this.handleOpen} fluid primary />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Oktató hozzáadása</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleInsert} error={formError}>
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
