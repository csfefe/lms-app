import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon, Input, Message } from 'semantic-ui-react';


export default class SingleFileUpload extends Component {
  state = { uploading: false, error: false, success: false };

  fileReader = new FileReader();
  file = null;

  handleUpload = (e) => {
    e.preventDefault();
    this.setState({ uploading: true });
    if (this.file == null) {
      this.setState({ uploading: false, error: true });
      return;
    }
    this.fileReader.onload = this.uploadToServer;
    this.fileReader.readAsBinaryString(this.file);
  };

  handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const textInput = ReactDOM.findDOMNode(this.refs.textInput);
    textInput.firstChild.value = file.name;
    this.file = file;
    this.setState({ error: false });
  };

  handleSuccessDismiss = (e) => {
    e.preventDefault();
    this.setState({ success: false });
  };

  uploadCallback = (error) => {
    if (error) {
      console.error(error);
      this.setState({ uploading: false, error: true });
    } else {
      this.setState({ uploading: false, error: false, success: true });
    }
  };

  uploadToServer = (e) => {
    e.preventDefault();
    throw new Meteor.Error('missing uploadToServer implementation is missing');
  };

  render() {
    const { placeholder, accept } = this.props;
    const { uploading, success, error } = this.state;
    const successMessage = success ?
      <SuccessMessage onDismiss={this.handleSuccessDismiss} /> : null;
    return (
      <div>
        <Input ref="textInput" placeholder={placeholder} error={error} action fluid readOnly>
          <input onClick={() => ReactDOM.findDOMNode(this.refs.fileInput).click()} />
          <Button
            icon
            labelPosition="right"
            loading={uploading}
            onClick={this.handleUpload}
            primary
          >
            Feltöltés
            <Icon name="upload" />
          </Button>
        </Input>
        <input
          ref="fileInput"
          type="file"
          accept={accept}
          onChange={this.handleFileChange}
          hidden
        />
        {successMessage}
      </div>
    );
  }
}

const SuccessMessage = props => (
  <Message
    header="Sikeres feltöltés!"
    onDismiss={props.onDismiss}
    success
  />
);
