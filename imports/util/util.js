import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import Papa from 'papaparse';

import PartnerCollection from '../api/partners';


export function isPasswordValid(password, passwordAgain) {
  return !(!password || password.length < 8 || password !== passwordAgain);
}

export function checkNotEmpty(data, errorMsg = 'empty') {
  if (_.isNil(data) || _.isEmpty(data)) {
    throw new Meteor.Error(errorMsg);
  }
}

export function parseCsvSafely(csvContent) {
  const parsed = Papa.parse(csvContent, { header: true, skipEmptyLines: true });
  if (!_.isEmpty(parsed.errors)) {
    throw new Meteor.Error(parsed.errors);
  }
  return parsed.data;
}

export function checkPartner(_id) {
  if (!PartnerCollection.findOne(_id)) {
    throw new Meteor.Error('invalid partner');
  }
}

export function swap(array, a, b) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
  return array;
}

export function getPremadeUser(collection) {
  return collection.findOne(Meteor.user().premadeId);
}

export function lazyInit(loading, initializer) {
  return loading ? [] : initializer();
}

export function mapRecordsToOptions(records, valueField, ...textFields) {
  return records.map((record) => {
    const field = _.find(textFields, f => _.has(record, f));
    if (!field) {
      throw new Meteor.Error('record not contains any given field');
    }
    return { value: record[valueField], text: record[field] };
  });
}

export function mergeCollections(...collections) {
  return _.concat(...collections);
}

export function getLocalDateAndTime(dateObj) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
  const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
  const hours = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
  const minutes = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();
  return [`${year}-${month}-${day}`, `${hours}:${minutes}`];
}

export function parseDatetime(dateStr, timeStr = '00:00') {
  const date = new Date(dateStr);
  const [hour, min] = timeStr.split(':');
  date.setHours(Number(hour));
  date.setMinutes(Number(min));
  return date;
}
