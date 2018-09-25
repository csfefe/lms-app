import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


export default class AbstractSortable extends Component {
  static direction = Object.freeze({ ASC: 'ascending', DESC: 'descending' });

  static propTypes = {
    header: PropTypes.arrayOf(PropTypes.shape).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.init();
  }

  init() {
    const { header, data } = this.props;
    this.state.header = header;
    this.state.active = _.get(_.first(header), 'name');
    this.state.direction = this.state.active ? AbstractSortable.direction.ASC : null;
    this.state.data = this.state.active ? _.sortBy(data, this.state.active) : data;
    this.state.sorting = false;
  }

  fetchDataIfNeeded() {
    if (!this.state.sorting) {
      this.init();
    }
    this.state.sorting = false;
  }

  handleSort = (clicked, sortBy) => () => {
    const { data, active, direction } = this.state;
    if (active !== clicked) {
      this.setState({
        active: clicked,
        data: _.sortBy(data, sortBy),
        direction: AbstractSortable.direction.ASC,
        sorting: true,
      });
    } else {
      this.setState({
        data: data.reverse(),
        direction: direction === AbstractSortable.direction.ASC
          ? AbstractSortable.direction.DESC
          : AbstractSortable.direction.ASC,
        sorting: true,
      });
    }
  };

  renderHeader = () => (
    <Table.Header>
      <Table.Row>
        {this.state.header.map(({ name, text, width, sortBy }, index) => (
          !sortBy ?
            <Table.HeaderCell key={index} width={width}>{text}</Table.HeaderCell> :
            <Table.HeaderCell
              key={index}
              width={width}
              onClick={this.handleSort(name, sortBy)}
              sorted={this.state.active === name ? this.state.direction : null}
            >
              {text}
            </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
