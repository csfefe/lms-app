import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { USER_TYPE } from '../../constant';

import AbstractNavigation from '../components/AbstractNavigation';
import AbstractPages from '../components/AbstractPages';
import StackableMenu from '../components/StackableMenu';

import Subjects from './pages/subjects/Subjects';
import TopicApply from './pages/topic-apply/TopicApply';


const Home = () => <div>Üdvözöllek</div>;

const basePath = `/${USER_TYPE.student}`;
const pages = [
  { path: basePath, component: Home },
  { path: `${basePath}/my-subjects`, component: Subjects },
  { path: `${basePath}/topic-apply`, component: TopicApply },
];

class Navigation extends AbstractNavigation {
  render() {
    const { active } = this.state;
    const [home, subjects, topicApply] = pages;
    return (
      <StackableMenu>
        {this.renderLogo(home.path)}
        <Menu.Item
          content="Tárgyaim"
          name={subjects.path}
          active={active === subjects.path}
          as={Link}
          to={subjects.path}
          onClick={this.changeActiveItem}
        />
        <Menu.Item
          content="Témajelentkezés"
          name={topicApply.path}
          active={active === topicApply.path}
          as={Link}
          to={topicApply.path}
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
    requiredType={USER_TYPE.student}
  />
);

export default Pages;
