import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';

import CenteredBox from './components/CenteredBox';
import Changeable from './components/Changeable';


export default class Login extends Changeable {
  state = { email: '', password: '', loading: false, error: false };

  handleGoogleLogin = () => {
    Meteor.loginWithGoogle({}, (error) => {
      if (error) {
        console.error(error);
      } else {
        this.redirect();
      }
    });
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    const state = { ...this.state };
    Meteor.loginWithPassword(email, password, (error) => {
      state.loading = false;
      if (error) {
        console.error(error);
        state.error = true;
        this.setState(state);
      } else {
        this.redirect();
      }
    });
  };

  redirect = () => this.props.history.push(`/${Meteor.user().type}`);

  render() {
    const { email, password, loading, error } = this.state;
    return (
      <CenteredBox width={350}>
        <Header as="h3" content="VIR Portál" attached="top" />
        <Segment attached>
          <Form onSubmit={this.handleSubmit} loading={loading} error={error}>
            <Form.Input
              icon="at"
              iconPosition="left"
              placeholder="Email"
              field="email"
              value={email}
              onChange={this.handleRootChange}
              fluid
              required
            />
            <Form.Input
              type="password"
              icon="lock"
              iconPosition="left"
              placeholder="Jelszó"
              field="password"
              value={password}
              onChange={this.handleRootChange}
              fluid
              required
            />
            <Message header="Bejelentkezés sikertelen!" error />
            <Form.Button content="Bejelentkezés" fluid primary />
          </Form>
          <Divider horizontal>Vagy</Divider>
          <Button
            icon="google"
            content="Google fiók"
            onClick={this.handleGoogleLogin}
            fluid
          />
        </Segment>
        <Message attached warning>
          <Icon name="help" />Még nincs fiókod? <Link to="/register">Regisztrálj!</Link>
        </Message>
        <Message attached="bottom" info>
          <Icon name="info" />Elfelejtetted a jelszavad?
          <Link to="/forgot-password"> Változtasd meg!</Link>
        </Message>
      </CenteredBox>
    );
  }
}
