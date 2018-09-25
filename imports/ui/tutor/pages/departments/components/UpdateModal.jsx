import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.department = props.department;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'departments.update',
      this.state.department._id,
      this.state.department,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { department, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="write" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Tanszék szerkesztése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Input
              label="Név"
              placeholder="Név"
              entity={entity}
              field="name"
              value={department.name}
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
