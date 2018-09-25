import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { USER_TYPE } from '../../constant';

import AbstractNavigation from '../components/AbstractNavigation';
import AbstractPages from '../components/AbstractPages';
import StackableMenu from '../components/StackableMenu';

import Review from './pages/review/Review';


const Home = () => <div>Üdvözöllek</div>;

const basePath = `/${USER_TYPE.consultant}`;
const pages = [
  { path: basePath, component: Home },
  { path: `${basePath}/review`, component: Review },
];

class Navigation extends AbstractNavigation {
  render() {
    const [home, review] = pages;
    return (
      <StackableMenu>
        {this.renderLogo(home.path)}
        <Menu.Item
          content="Értékelés"
          name={review.path}
          active={this.state.active === review.path}
          as={Link}
          to={review.path}
          onClick={this.changeActiveItem}
        />
        <Menu.Menu position="right">
          {this.renderLogout()}
        </Menu.Menu>
      </StackableMenu>
    );
  }
}

const Pages = () =>
  (<AbstractPages
    basePath={basePath}
    navigation={withRouter(Navigation)}
    pages={pages}
    requiredType={USER_TYPE.consultant}
  />);

export default Pages;
