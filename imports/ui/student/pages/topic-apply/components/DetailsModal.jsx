import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

import AbstractModal from '../../../../components/AbstractModal';


export default class DetailsModal extends AbstractModal {
  render() {
    const { topic } = this.props;
    const trigger = <Button icon="info" onClick={this.handleOpen} />;
    return (
      <Modal trigger={trigger} open={this.state.open} onClose={this.handleClose} size="small">
        <Modal.Header>Téma részletei</Modal.Header>
        <Modal.Content>
          <Header as="h5">Cím</Header>
          <p>{topic.title}</p>
          <Header as="h5">Kibocsátó</Header>
          <p>{topic.department ? topic.department.name : topic.partner.name}</p>
          <Header as="h5">Tárgy</Header>
          <p>{topic.subject.name}</p>
          <Header as="h5">Leírás</Header>
          <p>{topic.description}</p>
        </Modal.Content>
        <Modal.Actions><Button onClick={this.handleClose}>Bezárás</Button></Modal.Actions>
      </Modal>
    );
  }
}
