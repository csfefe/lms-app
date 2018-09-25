import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button, Dropdown, Form, Input, Label, Message, Modal, Segment } from 'semantic-ui-react';

import { ServerFormatter } from '../../../../../util/Formatter';
import { getLocalDateAndTime } from '../../../../../util/util';

import FormModal from '../../../../components/FormModal';


export default class DocumentsModal extends FormModal {
  constructor(props) {
    super(props);
    this.state.documents = [];
  }

  handleAdd = (e) => {
    e.preventDefault();
    const { documents } = this.state;
    const pos = documents.length;
    this.props.documents[pos] = {};
    documents.push(<Document
      key={pos}
      document={this.props.documents[pos]}
      onRemove={this.handleRemove}
    />);
    this.setState({ documents });
  };

  handleRemove = document => (e) => {
    e.preventDefault();
    const index = this.props.documents.map(elem => elem.name).indexOf(document.name);
    this.props.documents.splice(index, 1);
    this.state.documents.splice(index, 1);
    this.forceUpdate();
  };

  handleUpdate = (e) => {
    e.preventDefault();
    Meteor.call(
      'subjects.updateDocuments',
      this.props._id,
      ServerFormatter.formatDocuments(this.props.documents),
      this.submitCallback(this.handleSuccess),
    );
  };

  static formatDocumentToClient(document) {
    const res = { name: document.name, dir: document.dir, extensions: document.extensions };
    const [startDate, startTime] = getLocalDateAndTime(document.uploadStart);
    const [endDate, endTime] = getLocalDateAndTime(document.uploadEnd);
    res.uploadStartDate = startDate;
    res.uploadStartTime = startTime;
    res.uploadEndDate = endDate;
    res.uploadEndTime = endTime;
    return res;
  }

  componentWillMount() {
    const existingDocuments = this.props.documents;
    if (!existingDocuments || existingDocuments.length < 1) {
      return;
    }
    const { documents } = this.state;
    for (let i = 0; i < existingDocuments.length; ++i) {
      existingDocuments[i] = DocumentsModal.formatDocumentToClient(existingDocuments[i]);
      documents.push(<Document
        key={i}
        document={existingDocuments[i]}
        onRemove={this.handleRemove}
      />);
    }
    this.setState({ documents });
  }

  render() {
    const { open, formError } = this.state;
    const documents = Object.values(this.state.documents);
    const { formId } = this.props;
    const trigger = <Button icon="file text" onClick={this.handleOpen} />;
    let segments = null;
    if (documents.length > 0) {
      segments = <Segment.Group>{documents}</Segment.Group>;
    }
    return (
      <Modal trigger={trigger} open={open} onClose={this.handleClose} size="small">
        <Modal.Header>Dokumentumok kezelése</Modal.Header>
        <Modal.Content>
          <Form id={formId} onSubmit={this.handleUpdate} error={formError}>
            <Button fluid icon="add" onClick={this.handleAdd} />
            {segments}
            <Message header="Hozzáadás sikertelen!" error />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Mégsem</Button>
          <Button type="submit" form={formId} primary>Frissítés</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

class Document extends Component {
  state = {
    name: '',
    dir: '',
    extensions: '',
    uploadStartDate: '',
    uploadStartTime: '',
    uploadEndDate: '',
    uploadEndTime: '',
  };

  componentWillMount() {
    this.setState(this.props.document);
  }

  extensionOptions = Meteor.settings.public.documentExtensions.map(ext => ({
    value: `.${ext}`,
    text: ext.toUpperCase(),
  }));

  handleChange = (e, { field, value }) => {
    e.preventDefault();
    this.props.document[field] = value;
    this.setState({ [field]: value });
  };

  render() {
    const {
      name, dir, extensions, uploadStartDate, uploadStartTime, uploadEndDate, uploadEndTime,
    } = this.state;
    return (
      <Segment>
        <Label
          as="a"
          color="red"
          ribbon="right"
          icon="trash"
          onClick={this.props.onRemove(this.state)}
        />
        <Form.Group widths="equal">
          <Form.Field>
            <label><strong>Dokumentum név</strong></label>
            <Input
              placeholder="Dokumentum név"
              field="name"
              value={name}
              label={{ icon: 'asterisk' }}
              labelPosition="right corner"
              onChange={this.handleChange}
              fluid
              required
            />
            <datalist id="dirs">
              <option value="labor" />
              <option value="pot" />
            </datalist>
          </Form.Field>
          <Form.Field>
            <label><strong>Mappa név</strong></label>
            <Input
              placeholder="Mappa név"
              field="dir"
              value={dir}
              onChange={this.handleChange}
              fluid
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label><strong>Kiterjesztés</strong></label>
          <Dropdown
            placeholder="Minden fájl"
            field="extensions"
            options={this.extensionOptions}
            defaultValue={extensions}
            onChange={this.handleChange}
            multiple
            selection
            fluid
          />
          <datalist id="dirs">
            <option value="labor" />
            <option value="pot" />
          </datalist>
        </Form.Field>
        <label><strong>Feltöltés kezdete</strong></label>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              type="date"
              icon="calendar"
              iconPosition="left"
              label={{ icon: 'asterisk' }}
              labelPosition="right corner"
              field="uploadStartDate"
              value={uploadStartDate}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <Input
              type="time"
              icon="clock"
              iconPosition="left"
              label={{ icon: 'asterisk' }}
              labelPosition="right corner"
              field="uploadStartTime"
              value={uploadStartTime}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
        </Form.Group>
        <label><strong>Feltöltés vége</strong></label>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              type="date"
              icon="calendar"
              iconPosition="left"
              label={{ icon: 'asterisk' }}
              labelPosition="right corner"
              field="uploadEndDate"
              value={uploadEndDate}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <Input
              type="time"
              icon="clock"
              iconPosition="left"
              label={{ icon: 'asterisk' }}
              labelPosition="right corner"
              field="uploadEndTime"
              value={uploadEndTime}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
        </Form.Group>
      </Segment>
    );
  }
}
