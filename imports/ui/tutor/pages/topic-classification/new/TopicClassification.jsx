import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

import TopicCollection from '../../../../../api/topics';

import { USER_TYPE } from '../../../../../constant';
import { ClientFormatter } from '../../../../../util/Formatter';
import TopicClassifier from '../../../../../util/TopicClassifier';
import { lazyInit } from '../../../../../util/util';

import DividingHeader from '../../../../components/DividingHeader';
import FullPageLoader from '../../../../components/FullPageLoader';

import TopicClassificationTable from './components/TopicClassificationTable';
import UnclassifiedStudentsTable from './components/UnclassifiedStudentsTable';


class TopicClassification extends Component {
  classifier = null;
  classification = null;

  _init() {
    const { topics, students } = this.props;
    this.classifier = new TopicClassifier(topics, students);
    this.classification = this.classifier.classify();
  }

  handleUpdate = () => this.forceUpdate();

  render() {
    if (this.props.loading) {
      return <FullPageLoader />;
    }
    if (this.classifier == null) {
      this._init();
    }
    const unclassifiedStudents = this.classifier.findUnclassifiedStudents(this.classification);
    return (
      <div>
        <DividingHeader>Nem besorolt hallgatók</DividingHeader>
        <UnclassifiedStudentsTable topics={this.props.topics} students={unclassifiedStudents} />
        <DividingHeader>Új témabesorolás</DividingHeader>
        <TopicClassificationTable
          classification={this.classification}
          students={unclassifiedStudents}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  const loading = !Meteor.subscribe('students').ready()
    || !Meteor.subscribe('registeredUsers', USER_TYPE.student).ready()
    || !Meteor.subscribe('topics').ready();
  return {
    loading,
    students: lazyInit(loading, ClientFormatter.formatStudents),
    topics: TopicCollection.find().fetch(),
  };
})(TopicClassification);
