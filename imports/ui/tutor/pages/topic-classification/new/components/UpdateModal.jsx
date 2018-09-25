import _ from 'lodash';
import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import { mapRecordsToOptions } from '../../../../../../util/util';

import FormModal from '../../../../../components/FormModal';


export default class UpdateModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.student = props.current;
  }

  handleChange = (e, { value }) => {
    this.setState({ student: _.find(this.props.students, { _id: value }) });
  };

  handleUpdate = (e, { pos }) => {
    this.props.onUpdate(pos, this.state.student);
    this.setState({ open: false });
  };

  render() {
    const { open, formError } = this.state;
    const { formId, pos, current, students } = this.props;
    const studentOptions = mapRecordsToOptions(
      current ? students.concat([current]) : students.slice(),
      '_id',
      'name',
      'email',
    );
    const trigger = <Button icon="write" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Hallgató frissítése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} pos={pos} error={formError}>
            <Form.Select
              label="Hallgató"
              placeholder="Hallgató"
              field="name"
              options={studentOptions}
              defaultValue={current ? current._id : null}
              disabled={_.isEmpty(studentOptions)}
              onChange={this.handleChange}
              fluid
              required
            />
            <Message error header="Frissítés sikertelen!" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Mégsem</Button>
          <Button type="submit" form={formId} primary>Frissítése</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
