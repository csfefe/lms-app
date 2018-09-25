import { Component } from 'react';


export default class Changeable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRootChange = (e, { field, value }) => this.setState({ [field]: value });

  handleCheckboxChange = (e, { entity, field, checked }) => {
    this.state[entity][field] = checked;
    this.forceUpdate();
  };

  handleEntityChange = (e, { entity, field, value }) => {
    this.state[entity][field] = value;
    this.forceUpdate();
  };
}
