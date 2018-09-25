import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Header, Icon, Message, Popup } from 'semantic-ui-react';

import { isPasswordValid } from '../util/util';
import Changeable from './components/Changeable';


export default class Register extends Changeable {
  constructor(props) {
    super(props);
    this.state.formError = false;
    this.state.invalidPassword = false;
    this.state.user = { email: '', name: '', password: '', passwordAgain: '' };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, passwordAgain } = this.state.user;
    if (!isPasswordValid(password, passwordAgain)) {
      this.setState({ invalidPassword: true });
      return;
    }
    Meteor.call('users.insert', this.state.user, (error) => {
      if (error) {
        console.error(error);
        this.setState({ formError: true, invalidPassword: false });
      } else {
        this.props.history.push('/login');
      }
    });
  };

  render() {
    const { user, formError, invalidPassword } = this.state;
    const entity = 'user';
    return (
      <Container style={{ paddingTop: '1em', paddingBottom: '1em' }}>
        <Header as="h3" content="Fiók létrehozása" attached="top" />
        <Form className="attached fluid segment" onSubmit={this.handleSubmit} error={formError}>
          <Form.Input
            label="Email"
            placeholder="Email"
            entity={entity}
            field="email"
            value={user.email}
            onChange={this.handleEntityChange}
            fluid
            required
          />
          <Form.Input
            label="Név"
            placeholder="Név"
            entity={entity}
            field="name"
            value={user.name}
            onChange={this.handleEntityChange}
            fluid
            required
          />
          <Popup
            header="Követelmények"
            content="Legalább 8 karakter"
            on="focus"
            trigger={
              <Form.Input
                type="password"
                label="Jelszó"
                placeholder="Jelszó"
                entity={entity}
                field="password"
                value={user.password}
                onChange={this.handleEntityChange}
                error={invalidPassword}
                fluid
                required
              />
            }
          />
          <Form.Input
            type="password"
            label="Jelszó újra"
            placeholder="Jelszó újra"
            entity={entity}
            field="passwordAgain"
            value={user.passwordAgain}
            onChange={this.handleEntityChange}
            error={invalidPassword}
            fluid
            required
          />
          <Message header="Regisztráció sikertelen!" error />
          <Form.Button fluid primary content="Regisztráció" />
        </Form>
        <Message attached warning>
          <Icon name="help" />Már van fiókod? <Link to="/login">Jelentkezz be!</Link>
        </Message>
        <Message attached="bottom" info>
          <Icon name="info" />Elfelejtetted a jelszavad? <Link to="/forgot-password">Változtasd meg!</Link>
        </Message>
      </Container>
    );
  }
}
