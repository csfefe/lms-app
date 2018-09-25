import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class InsertModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.department = this.init();
  }

  init = () => ({ name: '' });

  handleSuccess = () => this.setState({ open: false, formError: false, department: this.init() });

  handleInsert = (e) => {
    e.preventDefault();
    Meteor.call(
      'departments.insert',
      this.state.department,
      this.submitCallback(this.handleSuccess),
    );
  };

  render() {
    const { department, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="add" onClick={this.handleOpen} fluid primary />;
    return (
      <Modal trigger={trigger} open={open} size="small" onClose={this.handleClose}>
        <Modal.Header>Tanszék hozzáadása</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleInsert} error={formError}>
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
            <Message header="Hozzáadás sikertelen!" error />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Mégsem</Button>
          <Button primary type="submit" form={formId}>Hozzáadás</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
