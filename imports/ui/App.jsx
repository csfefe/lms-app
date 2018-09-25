import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import FullPageLoader from './components/FullPageLoader';
import ConsultantPages from './consultant/Pages';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import PartnerContactPages from './partner-contact/Pages';
import Register from './Register';
import ResetPassword from './ResetPassword';
import StudentPages from './student/Pages';
import TutorPages from './tutor/Pages';


const App = ({ loading, redirectPath }) => (
  loading ?
    <FullPageLoader /> :
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={redirectPath} />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={withRouter(ResetPassword)} />
        <Route path="/register" component={Register} />
        <Route path="/consultant" component={ConsultantPages} />
        <Route path="/partner-contact" component={PartnerContactPages} />
        <Route path="/student" component={StudentPages} />
        <Route path="/tutor" component={TutorPages} />
        <Route render={() => <Redirect to={redirectPath} />} />
      </Switch>
    </BrowserRouter>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
};


function makeRedirectPath(loading, user) {
  const login = '/login';
  if (loading) {
    return login;
  }
  return user === null ? login : `/${user.type}`;
}

export default withTracker(() => {
  const user = Meteor.user();
  const loading = user === undefined;
  return {
    loading,
    redirectPath: makeRedirectPath(loading, user),
  };
})(App);
