import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { USER_TYPE } from '../../constant';

import AbstractNavigation from '../components/AbstractNavigation';
import AbstractPages from '../components/AbstractPages';
import StackableMenu from '../components/StackableMenu';

import Consultants from './pages/constultants/Consultants';
import Topics from './pages/topics/Topics';


const Home = () => <div>Üdvözöllek</div>;

const basePath = `/${USER_TYPE.partnerContact}`;
const pages = [
  { path: basePath, component: Home },
  { path: `${basePath}/topics`, component: Topics },
  { path: `${basePath}/consultants`, component: Consultants },
];

class Navigation extends AbstractNavigation {
  render() {
    const { active } = this.state;
    const [home, topics, consultants] = pages;
    return (
      <StackableMenu>
        {this.renderLogo(home.path)}
        <Menu.Item
          content="Témák"
          name={topics.path}
          active={active === topics.path}
          as={Link}
          to={topics.path}
          onClick={this.changeActiveItem}
        />
        <Menu.Item
          content="Konzulensek"
          name={consultants.path}
          active={active === consultants.path}
          as={Link}
          to={consultants.path}
          onClick={this.changeActiveItem}
        />
        <Menu.Menu position="right">
          {this.renderLogout()}
        </Menu.Menu>
      </StackableMenu>
    );
  }
}

const Pages = () => (
  <AbstractPages
    basePath={basePath}
    navigation={withRouter(Navigation)}
    pages={pages}
    requiredType={USER_TYPE.partnerContact}
  />
);

export default Pages;
