import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';


class AbstractNavigation extends Component {
  static propTypes = {
    history: PropTypes.shape({
      location: PropTypes.shape({ pathname: PropTypes.string }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
    const path = props.history.location.pathname;
    if (path.match(/\//g).length > 1) {
      this.state.active = path;
    }
  }

  changeActiveItem = (e, { name }) => this.setState({ active: name });

  renderLogo = path => (
    <Menu.Item
      content="VIR Portál"
      as={Link}
      to={path}
      onClick={() => this.setState({ active: undefined })}
      header
    />
  );

  renderLogout = () => (
    <Menu.Item
      content="Kijelentkezés"
      as={Link}
      to="/login"
      onClick={() => Meteor.logout()}
    />
  );
}

export default AbstractNavigation;
