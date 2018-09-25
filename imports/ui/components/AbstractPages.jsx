import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PrivateRoute from './PrivateRoute';


const AbstractPages = ({ navigation: Component, basePath, pages, requiredType }) => (
  <Container>
    <header style={{ paddingTop: '1em', paddingBottom: '2em' }}>{<Component />}</header>
    <main style={{ paddingBottom: '1em' }}>
      <Switch>
        {pages.map((page, index) =>
          (<PrivateRoute
            key={index}
            user={Meteor.user()}
            requiredType={requiredType}
            exact
            path={page.path}
            component={page.component}
          />))}
        <Route render={() => <Redirect to={basePath} />} />
      </Switch>
    </main>
  </Container>
);

AbstractPages.propTypes = {
  navigation: PropTypes.func.isRequired,
  basePath: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape).isRequired,
  requiredType: PropTypes.string.isRequired,
};

export default AbstractPages;
