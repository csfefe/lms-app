import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import FormModal from '../../../../components/FormModal';


export default class InsertModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.student = this.init();
  }

  init = () => ({ email: '', neptun: '' });

  handleSuccess = () => this.setState({ open: false, formError: false, student: this.init() });

  handleInsert = (e) => {
    e.preventDefault();
    Meteor.call('students.insert', this.state.student, this.submitCallback(this.handleSuccess));
  };

  render() {
    const { student, open, formError } = this.state;
    const { formId, entity } = this.props;
    const trigger = <Button icon="add" onClick={this.handleOpen} fluid primary />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Hallgató hozzáadása</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleInsert} error={formError}>
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
            <Message header="Hozzáadás sikertelen!" error />
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
