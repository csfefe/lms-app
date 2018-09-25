import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Form, Header, Message, Segment } from 'semantic-ui-react';
import { isPasswordValid } from '../util/util';

import CenteredBox from './components/CenteredBox';
import Changeable from './components/Changeable';


const resetErrorMessage = <Message header="Új jelszó beállítása sikertelen!" error />;

const invalidPasswordMessage = (
  <Message
    header="Nem megfelelő jelszó!"
    content="A jelszó legalább 8 karakterből kell álljon."
    error
  />
);

export default class ResetPassword extends Changeable {
  constructor(props) {
    super(props);
    this.token = this.props.location.hash.substring(1);
    this.state.password = '';
    this.state.passwordAgain = '';
    this.state.loading = false;
    this.state.error = false;
    this.state.invalidPassword = false;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, passwordAgain } = this.state;
    if (!isPasswordValid(password, passwordAgain)) {
      this.setState({ invalidPassword: true });
      return;
    }
    this.setState({ loading: true, invalidPassword: false });
    Accounts.resetPassword(this.token, password, (error) => {
      if (error) {
        console.error(error);
        this.setState({ loading: false, error: true });
      } else {
        this.props.history.push(`/${Meteor.user().type}`);
      }
    });
  };

  render() {
    const { password, passwordAgain, loading, error, invalidPassword } = this.state;
    const errorMessage = invalidPassword ? invalidPasswordMessage : resetErrorMessage;
    return (
      <CenteredBox width={350}>
        <Header as="h3" content="Új jelszó beállítása" attached="top" />
        <Segment attached="bottom">
          <Form onSubmit={this.handleSubmit} loading={loading} error={error || invalidPassword}>
            <Form.Input
              type="password"
              label="Jelszó"
              placeholder="Jelszó"
              field="password"
              value={password}
              onChange={this.handleRootChange}
              error={invalidPassword}
              fluid
              required
            />
            <Form.Input
              type="password"
              label="Jelszó újra"
              placeholder="Jelszó újra"
              field="passwordAgain"
              value={passwordAgain}
              onChange={this.handleRootChange}
              error={invalidPassword}
              fluid
              required
            />
            {errorMessage}
            <Form.Button content="Beállítás" fluid primary />
          </Form>
        </Segment>
      </CenteredBox>
    );
  }
}
