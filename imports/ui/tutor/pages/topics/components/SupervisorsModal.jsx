import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import { mapRecordsToOptions } from '../../../../../util/util';

import FormModal from '../../../../components/FormModal';


export default class SupervisorsModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.topicId = props.topicId;
    this.state.consultantId = props.consultantId;
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const { _id, partnerId } = this.props;
    Meteor.call(
      'topics.updateSupervisors',
      _id, this.state.tutorId, this.state.consultantId, partnerId,
      this.submitCallback(this.handleSuccess),
    );
  };

  handleRemoveSuccess = () => this.setState({
    open: false,
    formError: false,
    tutorId: undefined,
    consultantId: undefined,
  });

  handleRemove = (e) => {
    e.preventDefault();
    const { _id, partnerId } = this.props;
    Meteor.call('topics.removeSupervisors', _id, partnerId, this.submitCallback(this.handleRemoveSuccess));
  };

  render() {
    const { tutorId, consultantId, open, formError } = this.state;
    const { formId, tutors, consultants, partnerId } = this.props;
    const trigger = <Button icon="user" onClick={this.handleOpen} />;
    const tutorOptions = mapRecordsToOptions(tutors, '_id', 'name', 'email');
    const consultantOptions = mapRecordsToOptions(_.filter(consultants, { partnerId }), '_id', 'name', 'email');
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Konzulensek frissítése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Form.Select
              label="Oktató"
              placeholder="Oktató"
              field="tutorId"
              options={tutorOptions}
              defaultValue={tutorId}
              onChange={this.handleRootChange}
              fluid
            />
            <Form.Select
              label="Konzulens"
              placeholder="Konzulens"
              field="consultantId"
              options={consultantOptions}
              defaultValue={consultantId}
              onChange={this.handleRootChange}
              disabled={partnerId === undefined}
              fluid
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
