import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Input, Menu, Table } from 'semantic-ui-react';

import { USER_TYPE } from '../../constant';

import AbstractNavigation from '../components/AbstractNavigation';
import AbstractPages from '../components/AbstractPages';
import SortableTable from '../components/SortableTable';
import StackableMenu from '../components/StackableMenu';

import Consultants from './pages/consultants/Consultants';
import Departments from './pages/departments/Departments';
import PartnerContacts from './pages/partner-contacts/PartnerContacts';
import Partners from './pages/partners/Partners';
import Students from './pages/students/Students';
import Subjects from './pages/subjects/Subjects';
import CurrentTopicClassification from './pages/topic-classification/current/TopicClassification';
import NewTopicClassification from './pages/topic-classification/new/TopicClassification';
import Topics from './pages/topics/Topics';
import Tutors from './pages/tutors/Tutors';
import Users from './pages/users/Users';


const Home = () => <div>Üdvözöllek</div>;

const Home1 = () => (
  <div>
    <h1>asd</h1>
    <SortableTable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3} sorted="ascending">Név</Table.HeaderCell>
          <Table.HeaderCell width={2}>Neptun kód</Table.HeaderCell>
          <Table.HeaderCell width={1}>Jegy</Table.HeaderCell>
          <Table.HeaderCell width={4}>Megjegyzés</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>h1@mail.com</Table.Cell>
          <Table.Cell>ABCDEF</Table.Cell>
          <Table.Cell>
            <Input placeholder="Jegy" transparent />
          </Table.Cell>
          <Table.Cell>
            <Input placeholder="Megjegyzés" transparent />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </SortableTable>
  </div>
);

const basePath = `/${USER_TYPE.tutor}`;
const pages = [
  { path: basePath, component: Home },
  { path: `${basePath}/review`, component: Home1 },
  { path: `${basePath}/topic-classification`, component: CurrentTopicClassification },
  { path: `${basePath}/topic-classification/new`, component: NewTopicClassification },
  { path: `${basePath}/users`, component: Users },
  { path: `${basePath}/students`, component: Students },
  { path: `${basePath}/tutors`, component: Tutors },
  { path: `${basePath}/topics`, component: Topics },
  { path: `${basePath}/subjects`, component: Subjects },
  { path: `${basePath}/departments`, component: Departments },
  { path: `${basePath}/partners`, component: Partners },
  { path: `${basePath}/partner-contacts`, component: PartnerContacts },
  { path: `${basePath}/consultants`, component: Consultants },
];

class Navigation extends AbstractNavigation {
  render() {
    const { active } = this.state;
    const [
      home, review, topicClassification, topicClassificationNew, users, students, tutors,
      topics, subjects, departments, partners, partnerContacts, consultants,
    ] = pages;
    return (
      <StackableMenu>
        {this.renderLogo(home.path)}
        <Menu.Item
          content="Értékelés"
          name={review.path}
          active={active === review.path}
          as={Link}
          to={review.path}
          onClick={this.changeActiveItem}
        />
        <Menu.Item
          content="Témabesorolás"
          name={topicClassification.path}
          active={active === topicClassification.path || active === topicClassificationNew.path}
          as={Link}
          to={topicClassification.path}
          onClick={this.changeActiveItem}
        />
        <Menu.Menu position="right">
          <Dropdown item text="Admin">
            <Dropdown.Menu>
              <Dropdown.Item
                text="Felhasználók"
                name={users.path}
                active={active === users.path}
                as={Link}
                to={users.path}
                onClick={this.changeActiveItem}
              />
              <Dropdown.Divider />
              <Dropdown.Item
                text="Hallgatók"
                name={students.path}
                active={active === students.path}
                as={Link}
                to={students.path}
                onClick={this.changeActiveItem}
              />
              <Dropdown.Item
                text="Oktatók"
                name={tutors.path}
                active={active === tutors.path}
                as={Link}
                to={tutors.path}
                onClick={this.changeActiveItem}
              />
              <Dropdown.Divider />
              <Dropdown.Item
                text="Témák"
                name={topics.path}
                active={active === topics.path}
                as={Link}
                to={topics.path}
                onClick={this.changeActiveItem}
              />
              <Dropdown.Item
                text="Tárgyak"
                name={subjects.path}
                active={active === subjects.path}
                as={Link}
                to={subjects.path}
                onClick={this.changeActiveItem}
              />
              <Dropdown.Item
                text="Tanszékek"
                name={departments.path}
                active={active === departments.path}
                as={Link}
                to={departments.path}
                onClick={this.changeActiveItem}
              />
              <Dropdown.Divider />
              <Dropdown.Item
                text="Partnerek"
                name={partners.path}
                active={active === partners.path}
                as={Link}
                to={partners.path}
                onClick={this.changeActiveItem}
              />
              <Dropdown.Item
                text="Kapcsolattartók"
                name={partnerContacts.path}
                active={active === partnerContacts.path}
                as={Link}
                to={partnerContacts.path}
                onClick={this.changeActiveItem}
              />
              <Dropdown.Item
                text="Konzulensek"
                name={consultants.path}
                active={active === consultants.path}
                as={Link}
                to={consultants.path}
                onClick={this.changeActiveItem}
              />
            </Dropdown.Menu>
          </Dropdown>
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
    requiredType={USER_TYPE.tutor}
  />
);

export default Pages;
