import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import { mapRecordsToOptions } from '../../../../../util/util';

import FormModal from '../../../../components/FormModal';


export default class ConsultantModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.consultantId = props.consultantId;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'topics.updateConsultant', this.props.topicId, this.state.consultantId,
      this.submitCallback(this.handleSuccess),
    );
  };

  handleRemoveSuccess = () => this.setState({
    open: false,
    formError: false,
    consultantId: undefined,
  });

  handleRemove = (e) => {
    e.preventDefault();
    Meteor.call(
      'topics.removeConsultant',
      this.props._id,
      this.submitCallback(this.handleRemoveSuccess),
    );
  };

  render() {
    const { consultantId, open, formError } = this.state;
    const { formId, consultants } = this.props;
    const trigger = <Button icon="user" onClick={this.handleOpen} />;
    const consultantOptions = mapRecordsToOptions(consultants, '_id', 'name', 'email');
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Konzulens frissítése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Select
              label="Konzulens"
              placeholder="Konzulens"
              field="consultantId"
              options={consultantOptions}
              defaultValue={consultantId}
              onChange={this.handleRootChange}
              fluid
              required
            />
            <Message header="Frissítés sikertelen!" error />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Mégsem</Button>
          <Button color="red" onClick={this.handleRemove}>Törlés</Button>
          <Button type="submit" form={formId} primary>Frissítés</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
