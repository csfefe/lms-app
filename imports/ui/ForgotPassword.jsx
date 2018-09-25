import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { Form, Header, Icon, Message, Segment } from 'semantic-ui-react';

import CenteredBox from './components/CenteredBox';
import Changeable from './components/Changeable';


export default class ForgotPassword extends Changeable {
  state = { email: '', loading: false, success: false, error: false };

  handleSubmit = () => {
    this.setState({ loading: true });
    const state = { ...this.state };
    Accounts.forgotPassword({ email: state.email }, (error) => {
      state.loading = false;
      if (error) {
        console.error(error);
        state.success = false;
        state.error = true;
      } else {
        state.success = true;
        state.error = false;
      }
      this.setState(state);
    });
  };

  render() {
    const { email, loading, success, error } = this.state;
    return (
      <CenteredBox width={350}>
        <Header as="h3" content="Új jelszó beállítása" attached="top" />
        <Segment attached="bottom">
          <Form onSubmit={this.handleSubmit} loading={loading} success={success} error={error}>
            <Form.Input
              label="Regisztrált email"
              placeholder="Email"
              field="email"
              value={email}
              onChange={this.handleRootChange}
              fluid
              required
            />
            <Message info>
              <Icon name="info" />További teendők az üzenetben.
            </Message>
            <Message header="Üzenet kiküldése sikeres!" success />
            <Message header="Üzenet kiküldése sikertelen!" error />
            <Form.Button content="Küldés" fluid primary />
          </Form>
        </Segment>
      </CenteredBox>
    );
  }
}
