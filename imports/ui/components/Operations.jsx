import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Confirm } from 'semantic-ui-react';

import AbstractModal from './AbstractModal';


export default class Operations extends AbstractModal {
  handleRemove = () => {
    const { removeMethod, _id } = this.props;
    Meteor.call(removeMethod, _id, (error) => {
      if (error) {
        console.error(error);
      }
    });
  };

  render() {
    return (
      <div>
        <Button.Group fluid>
          {this.props.children}
          <Button color="red" icon="trash" onClick={this.handleOpen} />
          <Confirm
            size="tiny"
            confirmButton="Igen"
            cancelButton="Mégsem"
            content={this.props.removeContent}
            open={this.state.open}
            onCancel={this.handleClose}
            onConfirm={this.handleRemove}
          />
        </Button.Group>
      </div>
    );
  }
}
